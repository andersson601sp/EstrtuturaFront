import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models';
import { UserService } from '../../../services';
import { PaginatedResult, Pagination } from '../../../models/Pagination';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  loading = false;
  users: User[];
  displayedColumns = ['id', 'username', 'firstName', 'lastName', 'action'];
  pagination: Pagination;
  unsubscriber = new Subject();
  @Output() filtro: string = '';
  error = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.pagination = { currentPage: 1, itemsPerPage: 6 } as Pagination;
    this.read();
  }

  filterUser() {
     if(this.filtro.length > 2 || this.filtro.length < 1) {
      this.read();
    }
  }

  read(): void {
    this.spinner.show();
    console.log(this.spinner);
    this.pagination.filtro = this.filtro;
    this.loading = true;
    this.userService
      .getAll(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.pagination.filtro
      )
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(
        (users: PaginatedResult<User[]>) => {
          this.loading = false;
          console.log(users);
          this.users = users.result;
          this.pagination = users.pagination;
          console.log(users);
        },
        (error) => {
          console.log('crash');
          this.error = error;
          this.toastr.error(`erro: ${error.message}`);
          console.log(this.error);
          this.loading = false;
          this.spinner.hide();
        },
        () => this.spinner.hide()
      );
  }

  navigateToUserCreate(): void {
    this.router.navigate(['/user/create']);
  }

  navigateToUserEdit(): void {
    this.router.navigate(['/user/edit']);
  }

  OnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.read();
  }
}
