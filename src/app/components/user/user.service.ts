import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Page, QueryBuilder } from './../../shared/Pagination';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = `${environment.api}`;
  private readonly endpoint = 'users';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API}/${this.endpoint}`, user)
  }


  listUser(queryBuilder: QueryBuilder): Observable<Page<User>>{
    return this.http
      .get<User[]>(`${this.API}/${this.endpoint}?${queryBuilder.buildQueryString()}`, {observe: 'response'})
      .pipe(
        map(response => <Page<User>>Page.fromResponse(response))
    );
  }

  updateUser(user: any): Observable<User>{
    const url = `${this.API}/${this.endpoint}?iduser=${user.id}`
    return this.http.put<User>(url, user)
  }

  userById(id: number): Observable<User>{
    const url = `${this.API}/${this.endpoint}/${id}`
    return this.http.get<User>(url)
  }


  deleteUserById(id: number): Observable<User>{
    const url =  `${this.API}/${this.endpoint}?iduser=${id}`
    return this.http.delete<User>(url)
  }
}
