import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseAPI = "http://localhost:3000/users"

  constructor(private http: HttpClient) { }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseAPI, user)
  }

  read(): Observable<User[]>{
    return this.http.get<User[]>(this.baseAPI)
  }

  readById(id: number): Observable<User>{
    const url = `${this.baseAPI}/${id}`
    return this.http.get<User>(url)
  }

  update(user: User): Observable<User>{
    const url = `${this.baseAPI}/${user.id}`
    return this.http.put<User>(url, user)
  }

  delete(id: number): Observable<User>{
    const url = `${this.baseAPI}/${id}`
    return this.http.delete<User>(url)
  }
}
