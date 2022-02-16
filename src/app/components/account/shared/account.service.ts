import { Admin } from './admin.model';
import { Observable, throwError, throwIfEmpty } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode'


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  login(admin: Admin): Observable<string>{
    const requestOption: Object = {responseType: 'text'}
    const result = this.http.post<string>(`${environment.api}/login`, admin, requestOption);
    if(!result){
      throw throwError(() => ("Token not found"));
    }
    return result
  }

  
  isValidEmail(email: string): Observable<boolean> {
    const headers = new HttpHeaders()
    .append('email', email);
    const requestOption: Object = {headers, responseType: 'text'}
    return this.http.get<boolean>(`${environment.api}/is-valid-email`, requestOption);
  }
  
  isValidLogin(login: string): Observable<boolean> {
    const headers = new HttpHeaders()
      .append('login', login);
    const requestOption: Object = {headers, responseType: 'text'}
    return this.http.get<boolean>(`${environment.api}/is-valid-login`, requestOption);
  }

  createAccount(admin: Admin): Observable<Admin>{
    const newAdmin = this.http.post<Admin>(`${environment.api}/new-admin`, admin);
    if(!newAdmin){
      throw throwError(() => ("Admin not found"));
    }
    return newAdmin
  }

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
