import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { Logger, Config, UserType } from '../../shared/index';
import { NavBarService } from '../../shared/main-navbar/index';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['app/trader/single-pages/trader-home.component.css'],
  templateUrl: 'app/trader/single-pages/trader-home.component.html',
})

export class TraderHomeComponent implements OnInit  {

  constructor(
     private logger: Logger,
     private config: Config,
     private router: Router,
     private navBarService: NavBarService
  ) {}

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.NONE) {
      this.logger.alert('Please Login.');
      this.router.navigateByUrl('/');
      return;
    }

    if (this.config.loggedIn() === UserType.HANDLER) {
      this.logger.alert('Please log out as a handler to access the trader side of Agrity!');
      this.router.navigateByUrl('/handler-home');
      return;
    }
  }
}
