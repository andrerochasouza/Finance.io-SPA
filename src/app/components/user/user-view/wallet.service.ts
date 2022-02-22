import { Wallet } from './wallet';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from './../../../../environments/environment';
import { Page, QueryBuilder } from './../../../shared/Pagination';
import { App } from './app';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private readonly API = `${environment.api}`;
  private readonly endpoint = 'users/wallet';

  constructor(private http: HttpClient) { }

  createApp(app: App, idUser: number): Observable<App> {
    return this.http.post<App>(`${this.API}/${this.endpoint}/${idUser}/add/app`, app)
  }

  listApp(idUser: number, queryBuilder: QueryBuilder): Observable<Page<App>>{
    return this.http
      .get<App[]>(`${this.API}/${this.endpoint}/apps/${idUser}?${queryBuilder.buildQueryString()}`, {observe: 'response'})
      .pipe(
        map(response => <Page<App>>Page.fromResponse(response))
    );
  }

  getWallet(idUser: number): Observable<Wallet>{
    return this.http.get<Wallet>(`${this.API}/${this.endpoint}/${idUser}?page=0&limit=10`)
  }

  updateApp(app: any): Observable<App>{
    const url = `${this.API}/${this.endpoint}?iduser=${app.id}`
    console.log(url)
    return this.http.put<App>(url, app)
  }

  appById(id: number): Observable<App>{
    const url = `${this.API}/${this.endpoint}/${id}`
    console.log(url)
    return this.http.get<App>(url)
  }


  deleteAppById(idUser: number, idApp: number): Observable<App>{
    const url =  `${this.API}/${this.endpoint}/${idUser}/delete/app?idapp=${idApp}`
    return this.http.delete<App>(url)
  }
}
