import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseAPI = "http://localhost:3000/users"

  constructor(private http: HttpClient) { }

  read(): Observable<User[]>{
    return this.http.get<User[]>(this.baseAPI)
  }

  readById(id: string): Observable<User>{
    const url = `${this.baseAPI}/${id}`
    return this.http.get<User>(url)
  }
}
