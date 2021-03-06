import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import jwtDecode from 'jwt-decode';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Admin } from './admin.model';


@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private readonly API = `${environment.api}`;

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient) { }


  login(admin: Admin): Observable<string>{
    const requestOption: Object = {responseType: 'text'}

    const result = this.http.post<string>(this.API + '/login', admin, requestOption);

    return result
  }

  createAccount(admin: Admin): Observable<Admin>{
    const newAdmin = this.http.post<Admin>(this.API + '/new-admin', admin)
    return newAdmin;
  }

  checkIfLoginExists(login: string): Observable<boolean> {
    return this.http.get<boolean>(this.API + '/exists/login/' + login).pipe(delay(500));
  }

  checkIfEmailExists(email: string): Observable<boolean>{
    return this.http.get<boolean>(this.API + '/exists/email/' + email);
  }

  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['purple-snackbar']
    })
  }

  // Get Admin Information

  getAccountAdmin(login: string): Observable<Admin>{
    return this.http.get<Admin>(this.API + `/name/${login}`)
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
