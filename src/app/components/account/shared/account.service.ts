import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Admin } from './admin.model';


@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private readonly API = `${environment.api}`;

  constructor(private http: HttpClient) { }


  login(admin: Admin): Observable<string>{
    const requestOption: Object = {responseType: 'text'}

    const result = this.http.post<string>(this.API + '/login', admin, requestOption)
      .pipe(
        tap(console.log)
      );

    if(!result){
      throw throwError(() => ("Token not found"));
    }
    return result
  }

  createAccount(admin: Admin): Observable<Admin>{
    const newAdmin = this.http.post<Admin>(this.API + '/new-admin', admin)
        .pipe(
          tap(console.log)
        );

    if(!newAdmin){
      throw throwError(() => ("Admin not found"));
    }

    return newAdmin;
  }


  // Testes para verificação de Email e Login

  isValidEmail(email: string): Observable<boolean> {
    const headers = new HttpHeaders().append('email', email);

    const requestOption: Object = {headers, responseType: 'text'}

    return this.http.get<boolean>(this.API + '/is-valid-email', requestOption)
      .pipe(
        tap(console.log)
      );
  }

  isValidLogin(login: string): Observable<boolean> {
    const headers = new HttpHeaders().append('login', login);

    const requestOption: Object = {headers, responseType: 'text'}

    return this.http.get<boolean>(this.API + '/is-valid-login', requestOption)
      .pipe(
        tap(console.log)
      );;
  }


  // Testes para Autorização de token

  getAuthorizationToken(){
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirarionDate(token: string): Date | null {
    const decoded: any = jwtDecode(token);

    if(decoded.exp === undefined){
      return null
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token){
      return true;
    }

    const dateToken = this.getTokenExpirarionDate(token);
    if(dateToken === undefined){
      return false;
    }

    if(dateToken){
      return (dateToken.valueOf() < new Date().valueOf());
    } else {
      return true
    }
  }

  isUserLoggedIn(): boolean{
    const token = this.getAuthorizationToken();
    if(!token){
      return false;
    } else if (this.isTokenExpired(token)){
      return false;
    }

    return true;
  }
}
