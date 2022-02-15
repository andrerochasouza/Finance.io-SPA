import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  login(user: any): Observable<string>{
    const requestOption: Object = {responseType: 'text'}
    const result = this.http.post<any>(`${environment.api}/login`, user, requestOption);
    if(!result){
      throw throwError(() => ("Token not found"));
    }
    return result

    // async

    // const result = await this.http.post<any>(`${environment.api}/login`, user).toPromise();
    // console.log(result)
    // if(result && result === false){
    //   window.localStorage.setItem('token', result);
    //   return true
    // }

    // return false
  }

  createAccount(account: any): Observable<Object>{
    const newAdmin = this.http.post<Object>(`${environment.api}/new-admin`, account);
    if(!newAdmin){
      throw throwError(() => ("Account not found"));
    }
    return newAdmin
  }
}
