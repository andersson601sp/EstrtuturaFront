import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models';
import { UserService } from '../../../services';
import { PaginatedResult, Pagination } from '../../../models/Pagination';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  filtro = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.pagination = { currentPage: 1, itemsPerPage: 10 } as Pagination;
    this.read();
  }

  read(): void {
    this.pagination.filtro = this.filtro;
    this.loading = true;
    this.userService
      .getAll(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagination.filtro)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((users: PaginatedResult<User[]>) => {
        this.loading = false;
        console.log(users);
        this.users = users.result;
        this.pagination = users.pagination;
        console.log(users);
      });
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
