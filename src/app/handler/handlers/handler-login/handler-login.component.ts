import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router';
import { Location } from '@angular/common';

import { Config, UserType } from '../../../shared/index';
import { LoginInfo } from './login-info';
import { HandlerLoginService } from './handler-login.service';
import { NavBarService } from '../../../shared/main-navbar/index';

@Component({
    directives: [ROUTER_DIRECTIVES],
    providers: [],
    styleUrls: ['app/handler/handlers/handler-login/handler-login.component.css'],
    templateUrl: 'app/handler/handlers/handler-login/handler-login.component.html',
})

export class HandlerLoginComponent implements OnInit {

  /* NOTE: Referenced in .html file. */
  protected loginInfo = new LoginInfo('', '');

  private authTokenKey: string = 'auth_token';

  constructor(private handlerLoginService: HandlerLoginService,
              private config: Config,
              private router: Router,
              private location: Location,
              private navBarService: NavBarService
              ) {};

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.TRADER) {
      alert('Please log out as a trader to access the handler side of Agrity!');
      this.router.navigateByUrl('/trader-home');
      return;
    }

  }

  /* NOTE: Referenced in .html file. */
  protected login() {
    this.handlerLoginService.login(this.loginInfo)
      .subscribe(
        valid => {
          this.handlerLoginService
              .storeHandlerAuthToken(valid[this.authTokenKey]);
          this.navBarService.onHandlerLoggedIn(true);
          this.router.navigateByUrl('/handler-home');
        },
        error => {
          if (error.status === 401) {
            alert('Invalid Username or Password.');
          } else {
            alert('Server Error: Unable to Log In.');
          }
        });
  }

  /* NOTE: Referenced in .html file. */
  protected logout() {
    this.handlerLoginService.logout()
      .subscribe(
        valid => {
          this.handlerLoginService.eraseHandlerAuthToken();
          this.navBarService.onHandlerLoggedIn(false);
          alert('Successfully Logged Out');
          this.router.navigateByUrl('/');
        },
        error => {
          this.navBarService.onHandlerLoggedIn(false);
          alert('Successfully Logged Out');
          this.config.forceLogout();
        });
  }
}
