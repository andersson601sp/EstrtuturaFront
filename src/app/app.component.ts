import { Component } from '@angular/core';

import { AuthenticationService } from './services';
import { User, Role } from './models';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  user: User;
  title = 'EstruturaFront';

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  get isAdmin(): any {
    return this.user && this.user.role === Role.Admin;
  }

  logout(): any {
      this.authenticationService.logout();
  }
}
