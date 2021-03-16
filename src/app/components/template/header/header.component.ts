import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLogon = '';
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.userLogon = `Olá ${this.authenticationService.userValue.firstName}`;
  }

  logout(): void {
    this.authenticationService.logout();
}

}
