import { WalletService } from './wallet.service';
import { App } from './app';
import { Router, ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Page, PageRequest } from './../../../shared/Pagination';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  // list
  columnTable = ['name', 'value', 'options']
  page: Page<App> = new Page([], 0);
  pageEvent: PageEvent;

  idUser: number
  nameUser: string
  walletValue: number

  // Value color
  isValueP = false
  isValueN = false
  isValueE = false

  // carregando pagina
  loading = false;

  constructor(
    private walletService: WalletService,
    private router: Router,
    private routeActivated: ActivatedRoute) {
      this.routeActivated.params.subscribe(params => this.idUser = params['id']);
     }

  ngOnInit(): void {
    this.getWallet(this.idUser);
    this.listApp(this.idUser)
  }

  // Retorna um Wallet
  getWallet(idUser: number){
    return this.walletService.getWallet(idUser)
      .pipe(
        take(1)
      ).subscribe(wallet => {
        this.nameUser = wallet.nameUser
        this.walletValue = wallet.walletValue
      })
  }

  // Lista os Apps
  listApp(idUser: number){
    this.loading = true
    let queryAdicional
    this.walletService.listApp(idUser,
      new PageRequest(
        {
          pageNumber: this.pageEvent? this.pageEvent.pageIndex: 0,
          pageSize: this.pageEvent? this.pageEvent.pageSize: 10
        },
        queryAdicional
      )
    ).pipe(
        take(1)
    )
    .subscribe({
      next: page => {
        this.page = page;
        this.loading = false;
      },
      error: () => {
        this.page = new Page([], 0)
        this.loading = false
      }
    })
  }


  // Manda para walletRead do usuário
  viewApp(id: number){
    return this.router.navigate(['home/user/app/view', id]);
  }

  // Edita o usuário
  editApp(id: number){
    return this.router.navigate(['home/user/app/edit/', id]);
  }

  // Exclui o usuário
  deleteApp(id: number){
    if(confirm("Deseja realmente excluir esse usuário -- ID: " + id)) {
      this.walletService.deleteAppById(id)
      .pipe(
        take(1)
      )
      .subscribe(() => this.listApp(this.idUser));

    }
  }


  // Verificar as cores do wallet
  isValuePositiveNg(value: number | undefined): boolean {
    if (value != undefined) {
      if (value > 0) {
        return true
      } else {
        return false
      }
    }
    return false
  }

  isValueNegativeNg(value: number | undefined): boolean {
    if (value != undefined) {
      if (value < 0) {
        return true
      } else {
        return false
      }
    }
    return false
  }

  isValueCalculatorNg(value: number | undefined): boolean {
    if (value != undefined) {
      if (value > 0) {
        this.isValueP = true
        this.isValueN = false
        this.isValueE = false
      } else if (value < 0) {
        this.isValueP = false
        this.isValueN = true
        this.isValueE = false
      } else {
        this.isValueP = false
        this.isValueN = false
        this.isValueE = true
      }
      return true
    }
    return true
  }
}
