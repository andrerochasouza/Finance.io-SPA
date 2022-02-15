import { Admin } from './admin.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


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

  createAccount(admin: Admin): Observable<Admin>{
    const newAdmin = this.http.post<Admin>(`${environment.api}/new-admin`, admin);
    if(!newAdmin){
      throw throwError(() => ("Admin not found"));
    }
    return newAdmin
  }
}
