import { HttpHeaders, HttpResponse } from '@angular/common/http';
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

  createUser(id: string, user: User): Observable<User> {
    user.idAdmin = id
    return this.http.post<User>(`${this.API}/${this.endpoint}`, user)
  }


  listUser(idAdmin: string, queryBuilder: QueryBuilder): Observable<Page<User>>{
    let headers = new HttpHeaders().append('id', idAdmin)
    return this.http
      .get<Page<User>>(`${this.API}/${this.endpoint}?${queryBuilder.buildQueryString()}`, { headers, observe: 'response' })
      .pipe(
        map(response => <Page<User>>Page.fromResponse(response))
    );
  }

  updateUser(id: string, user: any): Observable<User>{
    user.idAdmin = id
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

  totalValueAdmin(idAdmin: string): Observable<Array<number>>{
    const url = `${this.API}/${this.endpoint}/maxvalue`
    let headers = new HttpHeaders().append('id', idAdmin)
    return this.http.get<Array<number>>(url, { headers });
  }
}
