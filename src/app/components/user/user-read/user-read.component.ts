import { DataService } from 'src/app/data.service';
import { AccountService } from './../../../views/home/account/shared/account.service';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { take, Observable } from 'rxjs';

import { Page, PageRequest } from './../../../shared/Pagination';
import { User } from './../user';
import { UserService } from './../user.service';
import { Admin } from 'src/app/views/home/account/shared/admin.model';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})

export class UserReadComponent implements AfterViewInit {

  // list
  columnTable = ['id', 'name', 'cpf', 'walletValue', 'options']
  page: Page<User> = new Page([], 0);
  idAdmin: number | undefined
  dataSource = new MatTableDataSource<User>(this.page.content);
  pageEvent: PageEvent;


  // Value color
  isValueP = false
  isValueN = false
  isValueE = false

  // carregando pagina
  loading = false;

  constructor(
    private accountService: AccountService,
    private dataService: DataService,
    private userService: UserService,
    private router: Router
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.accountService.getAccountAdmin(this.dataService.get('login')).subscribe(admin => { this.idAdmin = admin.id })
    this.listUser();
  }


  // Lista os usuários
  listUser() {
    this.loading = true
    let queryAdicional
    this.userService.listUser(
      String(this.idAdmin),
      new PageRequest(
        {
          pageNumber: this.pageEvent ? this.pageEvent.pageIndex : 0,
          pageSize: this.pageEvent ? this.pageEvent.pageSize : 5
        },
        queryAdicional
      )
    ).pipe(
      take(1)
    )
      .subscribe({
        next: page => {
          this.page = page;
          this.dataSource = new MatTableDataSource<User>(page.content)
          this.loading = false;
        },
        error: () => {
          this.page = new Page([], 0)
          this.loading = false
        }
      })
  }

  // Manda para walletRead do usuário
  viewUser(id: number) {
    return this.router.navigate(['home/user/wallet', id]);
  }

  // Edita o usuário
  editUser(id: number) {
    return this.router.navigate(['home/user/edit', id]);
  }

  // Exclui o usuário
  deleteUser(id: number) {
    if (confirm("ID: " + id + " - Deseja realmente excluir esse usuário")) {
      this.userService.deleteUserById(id)
        .pipe(
          take(1)
        )
        .subscribe(user => this.listUser());

    }
  }

  // Navega para o form de novo usuário
  newUser(): void {
    this.router.navigate(['home/user/add']);
  }

  // Verificar as cores do wallet

  isValuePositiveNg(walletValue: number | undefined): boolean {
    if (walletValue != undefined) {
      if (walletValue > 0) {
        return true
      } else {
        return false
      }
    }
    return false
  }

  isValueNegativeNg(walletValue: number | undefined): boolean {
    if (walletValue != undefined) {
      if (walletValue < 0) {
        return true
      } else {
        return false
      }
    }
    return false
  }

  isValueCalculatorNg(walletValue: number | undefined): boolean {
    if (walletValue != undefined) {
      if (walletValue > 0) {
        this.isValueP = true
        this.isValueN = false
        this.isValueE = false
      } else if (walletValue < 0) {
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

  // Filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
