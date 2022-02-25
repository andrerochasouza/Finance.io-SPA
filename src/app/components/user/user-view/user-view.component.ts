import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { Page, PageRequest } from './../../../shared/Pagination';
import { App } from './app';
import { WalletService } from './wallet.service';

@Component({
  selector: 'app-user-view',
  styleUrls: ['./user-view.component.css'],
  templateUrl: './user-view.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UserViewComponent implements OnInit {

  // list
  columnTable = ['name', 'value', 'options']

  expandedApp: App | null
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

  // Volta para os usuários
  toUsers(){
    return this.router.navigate([`/home/users`])
  }

  // Cria uma aplicação
  createApp(){
    return this.router.navigate([`home/user/wallet/${this.idUser}/app/add`]);
  }

  // Edita o usuário
  editApp(idApp: number){
    return this.router.navigate([`home/user/wallet/${this.idUser}/app/edit/${idApp}`]);
  }

  // Manda para walletRead do usuário
  viewApp(){

  }

  // Exclui o usuário
  deleteApp(name: string, idApp: number){
    if(confirm("Nome: "+ name + " - Deseja realmente excluir essa aplicação")) {
      this.walletService.deleteAppById(this.idUser, idApp)
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.getWallet(this.idUser)
        this.listApp(this.idUser)
      });
    }
  }


  // Verificar as cores do wallet
  isValueCalculatorNg(typeAplication: string | undefined, value: number): boolean {
    if(value === 0){
      this.isValueP = false
      this.isValueN = false
      this.isValueE = true
      return true
    } else {
      if (typeAplication === 'RECEITA') {
          this.isValueP = true
          this.isValueN = false
          this.isValueE = false
      } else if (typeAplication === 'DESPESA') {
          this.isValueP = false
          this.isValueN = true
          this.isValueE = false
      }
    }
    return true
  }
}
