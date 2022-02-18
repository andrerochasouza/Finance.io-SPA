import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = `${environment.api}/users/`;

  constructor(private http: HttpClient) { }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.API, user)
  }

  read(): Observable<User[]>{
    return this.http.get<User[]>(this.API)
  }

  readById(id: number): Observable<User>{
    const url = `${this.API}/${id}`
    return this.http.get<User>(url)
  }

  update(user: User): Observable<User>{
    const url = `${this.API}/${user.id}`
    return this.http.put<User>(url, user)
  }

  delete(id: number): Observable<User>{
    const url = `${this.API}/${id}`
    return this.http.delete<User>(url)
  }
}
