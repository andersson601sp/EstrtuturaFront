import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css'],
})
export class UserDeleteComponent implements OnInit {
  loginForm: FormGroup;
  unsubscriber = new Subject();
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  id = +this.route.snapshot.paramMap.get('id');

  user = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: '',
    token: '',
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getByUser();
  }

  getByUser(): void {
    this.loading = true;
    this.userService
      .getById(this.id)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(
        (user) => {
          this.loading = false;
          this.user = user;
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  confirmaexclusao(): void {
    this.deleteUser();
    this.router.navigate(['/user']);
  }

  deleteUser(): void {
    this.loading = true;
    return this.userService
      .delete(this.id)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => {
        },
        () => {
          this.error = 'Erro ao tentar excluir usuário';
          this.loading = false;
        }
      );
  }

  cancel(): void {
    this.router.navigate(['/user']);
  }

  OnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
