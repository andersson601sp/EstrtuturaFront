import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginatedResult } from '../models/Pagination';

@Injectable({ providedIn: 'root' })
export class UserService {
  [x: string]: any;

    constructor(private http: HttpClient) { }

    getAll(page?: number, itemsPerPage?: number, filtro?: string ): Observable<PaginatedResult<User[]>> {
      const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

      let params = new HttpParams();

      if (page != null && itemsPerPage != null) {
        params = params.append('pageNumber', page.toString());
        params = params.append('pageSize', itemsPerPage.toString());
        params = params.append('filtro', filtro);
      }

      return this.http.get<User[]>(`${environment.apiUrl}/users`, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    create(user: any): any {
      console.log(JSON.stringify(user));
      return this.http.post<User>(`${environment.apiUrl}/users`, JSON.stringify(user))
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
     );
    }

     update(user: any): any {
      console.log(JSON.stringify(user));
      return this.http.put<User>(`${environment.apiUrl}/users/${user.id}`, JSON.stringify(user))
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
     );
    }

     delete(id: number): any {
      return this.http.delete<User>(`${environment.apiUrl}/users/${id}`);
  }
}
