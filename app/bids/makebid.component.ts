import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {CanDeactivate, Router, RouteParams,RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

import {Config} from '../config/Config'
import {User} from '../users/user'
import {BidService} from './bid.service';
import {Bid} from './bid';
import {ErrorHandling} from '../ErrorHandling';
import {UserService} from '../users/user.service';
import {SpinnerComponent} from '../shared/spinner.component';
import {PaginationComponent} from '../shared/pagination.component';

import {CustomValidators} from '../customValidators'; 

@Component({
  templateUrl: 'app/bids/makebid.component.html',
  styles: [`
    .posts li { cursor: default; }
    .posts li:hover { background: #ecf0f1; } 
    .list-group-item.active, 
    .list-group-item.active:hover, 
    .list-group-item.active:focus { 
      background-color: #ecf0f1;
      border-color: #ecf0f1; 
      color: #2c3e50;
    }
    `],
    styleUrls: ['assets/stylesheets/style.css'],
    providers: [BidService, UserService],
    directives: [SpinnerComponent, PaginationComponent, RouterLink, ROUTER_DIRECTIVES]
})

export class MakeBidComponent implements OnInit {

  private newBidForm: ControlGroup;

  private bid: Bid = new Bid();

  private growers: User[];

  constructor(
    fb: FormBuilder,
    private _bidService: BidService,
    private _userService: UserService,
    private _errorHandling: ErrorHandling,
    private _config: Config,
    private _router: Router) {
    this.newBidForm = fb.group({
      almondVariety: ['', Validators.required],
      pricePerPound: ['', Validators.required],
      almondSize: ['', Validators.required],
      almondPounds: ['', Validators.required],
      delay: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  ngOnInit() {

    if (!this._config.loggedIn()) {
      this._router.navigateByUrl('/handler-login');
      alert("Please Login. If this issue continues try logging out, then logging back in.");
      return;   
    }

    // Load in Growers
    this.growers = [];
    this._userService.getUsers()
      .subscribe(
        users => {
          for (var userIdx in users) {
            this.growers.push(User.decode(users[userIdx]));
          }
        },
        error => this._errorHandling.handleHttpError(error));
  }

  save() {
    this.bid.growerIds
        = this.growers
            .filter(grower => grower.selected)
            .map(grower => grower.grower_id);


    this.bid.paymentDate = ''; // Not Implemented On Server

    this.bid.managementType = 'FCFSService';

    if (this.bid.managementTypeDelay < 0)
      this.bid.managementTypeDelay *= -1

    console.log(this.bid);

    this._bidService.createBid(this.bid)
      .subscribe(
        bid => {
          console.log("Bid Created: ");
          console.log(Bid.decode(bid));
        },
        error => this._errorHandling.handleHttpError(error));
  }
}
