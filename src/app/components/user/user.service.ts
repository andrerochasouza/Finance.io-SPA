import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = `${environment.api}/users/`;

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.API, user)
  }

  listUser(): Observable<User[]>{
    return this.http.get<User[]>(this.API)
  }

  userById(idUser: number): Observable<User>{
    const url = `${this.API}/${idUser}`
    return this.http.get<User>(url)
  }

  update(user: User): Observable<User>{
    const url = `${this.API}/${user.idUser}`
    return this.http.put<User>(url, user)
  }

  delete(idUser: number): Observable<User>{
    const url = `${this.API}/${idUser}`
    return this.http.delete<User>(url)
  }
}
