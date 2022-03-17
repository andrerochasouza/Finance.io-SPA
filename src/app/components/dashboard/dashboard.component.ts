import { Observable, take } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoChartSerie } from '@po-ui/ng-components';
import { DataService } from 'src/app/data.service';

import { AccountService } from './../../views/home/account/shared/account.service';
import { UserService } from './../user/user.service';
import { Admin } from 'src/app/views/home/account/shared/admin.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  poChart: Array<PoChartSerie>;
  height = 300;
  accountAdmin$: Observable<Admin>

  // carregando pagina
  loading = true;


  constructor(
    private accountService: AccountService,
    private dataService: DataService,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.accountAdmin$ = this.accountService.getAccountAdmin(this.dataService.get('login'))
    this.graphicUser();
  }

  graphicUser(): void {
    this.loading = true
    this.accountAdmin$.pipe(take(1))
      .subscribe(admin => {
        const poChartTotal$ = this.userService.totalValueAdmin(String(admin.idAdmin));
        poChartTotal$
          .subscribe({
            next: list => {
              const poChart = [
                { label: 'Positivos', data: list[0] },
                { label: 'Negativos', data: list[1] }
              ]
              this.poChart = poChart
              this.loading = false
            },
            error: err => {
              console.log("erro: " + err)
            }
          })
      })
  }
}
