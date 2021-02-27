import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  selectedValueRole: string;
  unsubscriber = new Subject();

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
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  id = +this.route.snapshot.paramMap.get('id');

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getByUser();
  }

  editUser(): void {
    this.loading = true;
    this.user.role = this.selectedValueRole;
    this.userService
      .update(this.user)
      .pipe()
      .subscribe(
        (data) => {
          this.router.navigate(['/user']);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  getByUser(): void {
    this.loading = true;
    this.userService
      .getById(this.id)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((user) => {
        this.loading = false;
        console.log(user);
        this.selectedValueRole = user.role;
        this.user = user;
        console.log(user);
      });
  }

  cancel(): void {
    this.router.navigate(['/user']);
  }

  OnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
