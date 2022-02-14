import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  async login(user: any){
    const result = await this.http.post<any>(`${environment.api}/login`, user).toPromise();
    console.log(result)
    if(result && result === false){
      window.localStorage.setItem('token', result);
      return true
    }

    return false
  }

  createAccount(account: any){
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
