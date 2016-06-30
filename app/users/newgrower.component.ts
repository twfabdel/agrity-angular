import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {CanDeactivate, Router, RouteParams,RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

import {Config} from '../config/Config';
import {BasicValidators} from '../shared/basicValidators';
import {CustomValidators} from '../customValidators';

import {UserService} from './user.service';
import {User} from './user';
import {ErrorHandling} from '../ErrorHandling';

@Component({
  templateUrl: 'app/users/newgrower.component.html',
  styleUrls: ['assets/stylesheets/style.css'],
  directives: [RouterLink, ROUTER_DIRECTIVES],
  providers: [UserService]
})

export class NewGrowerComponent implements OnInit {
  newgrowerform: ControlGroup;
  title: string;
  user = new User();

  constructor(
    fb: FormBuilder,
    private _router: Router,
    private _routeParams: RouteParams,
    private _userService: UserService,
    private _config: Config,
    private _errorHandling: ErrorHandling
  ) {
    this.newgrowerform = fb.group({
      first_name: ['', CustomValidators.isName],
      last_name: ['', CustomValidators.isName],
      email: ['', BasicValidators.email],
      phone: ['', CustomValidators.phone]
    });
  }

  ngOnInit(){

    if (!this._config.loggedIn()) {
      alert("Please Login. If this issue continues try logging out, then logging back in.");
      this._config.forceLogout();
      return;   
    }

    var id = this._routeParams.get("id");

    this.title = id ? "Edit User" : "New User";

    if (!id)
      return;

    this._userService.getUser(+id)
      .subscribe(
        user => this.user = user,
        error => {
          this._errorHandling.handleHttpError(error);
          this._config.forceLogout();
        });
  }

  // routerCanDeactivate(){
  //   if (this.newgrowerform.dirty)
  //     return confirm('You have unsaved changes. Are you sure you want to navigate away?');

  //   return true; 
  // }

  save(){
    var result;

    //if (this.user) 
    //    result = this._userService.updateUser(this.user);
    //else
    result = this._userService.addUser(this.user);

    result.subscribe(x => {
      // Ideally, here we'd want:
      // this.newgrowerform.markAsPristine();

      this.user = User.decode(x);
      this._router.navigateByUrl('users');
    });
  }
}
