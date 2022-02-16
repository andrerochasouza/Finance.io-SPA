import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseUserAPI = "http://localhost:3000/users/"

  constructor(private http: HttpClient) { }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUserAPI, user)
  }

  read(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUserAPI)
  }

  readById(id: number): Observable<User>{
    const url = `${this.baseUserAPI}/${id}`
    return this.http.get<User>(url)
  }

  update(user: User): Observable<User>{
    const url = `${this.baseUserAPI}/${user.id}`
    return this.http.put<User>(url, user)
  }

  delete(id: number): Observable<User>{
    const url = `${this.baseUserAPI}/${id}`
    return this.http.delete<User>(url)
  }
}
