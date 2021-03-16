import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Role } from 'src/app/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'router-outlet',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  selectedValueRole: string;

  roles: Roles[] = [
    { value: `${Role.Admin}`, viewValue: 'Administrador' },
    { value: `${Role.User}`, viewValue: 'Usuário' },
  ];

  user = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: '',
    token: '',
  };

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  createUser(): void {
    this.spinner.show();
    console.log(this.spinner);
    console.log(this.toastr);
    this.loading = true;
    this.user.role = this.selectedValueRole;
    this.userService
      .create(this.user)
      .pipe()
      .subscribe(
        (data) => {
          this.router.navigate(['/user']);
          this.toastr.success('Usuário salvo com sucesso!');
        },
        (error) => {
          this.error = error;
          this.toastr.error(`Erro: Usuário não pode ser salvo!`);
          this.loading = false;
          this.spinner.hide();
        },
        () => this.spinner.hide()
      );
  }

  cancel(): void {
    this.router.navigate(['/user']);
  }
}
