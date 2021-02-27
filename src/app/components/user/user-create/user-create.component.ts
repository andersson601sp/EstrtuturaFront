import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Role } from 'src/app/models';


interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  selectedValueRole: string;

  roles: Roles[] = [
    {value: `${Role.Admin}`, viewValue: 'Administrador'},
    {value: `${Role.User}`, viewValue: 'Usuário'}
  ];

  user = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: '',
    token: ''
  };

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private userService: UserService,  private router: Router) { }

  ngOnInit(): void {
  }

  createUser(): void {
    this.loading = true;
    this.user.role = this.selectedValueRole;
    this.userService.create(this.user)
        .pipe()
        .subscribe(
            data => {
              this.router.navigate(['/user']);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }

  cancel(): void {
    this.router.navigate(['/user']);
  }

}
