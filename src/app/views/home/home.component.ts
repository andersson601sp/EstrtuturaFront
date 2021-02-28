import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../models';
import { UserService, AuthenticationService } from '../../services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  user: User;
  userFromApi: User;

  constructor(private userService: UserService,  private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.userValue;
    console.log(this.user);
  }

  ngOnInit(): void {  }

}
