import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color } from 'd3';
import { Observable, take } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Admin } from 'src/app/views/home/account/shared/admin.model';
import { User } from '../user/user';

import { AccountService } from './../../views/home/account/shared/account.service';
import { UserService } from './../user/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  multi: any[];

  view: number[]

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme: string[] | Color = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];


  accountAdmin$: Observable<Admin>
  listUser: any[]
  positivados: number
  negativados: number
  idAdmin: string

  loading = true;

  constructor(
    private accountService: AccountService,
    private dataService: DataService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.accountAdmin$ = this.accountService.getAccountAdmin(this.dataService.get('login'))
    this.graphicUser();
  }

  graphicUser(): void {
    this.accountAdmin$.pipe(take(1))
      .subscribe(admin => {
        this.userService.listUser(String(admin.idAdmin))
          .pipe(take(1))
          .subscribe({
            next: list => {
              const listUser = list

              list.filter(user => {
                if(user.walletValue){
                  if(user.walletValue >= 0){
                    this.positivados++
                  } else {
                    this.negativados++
                  }
                } else {
                  this.positivados++
                }

              })
              this.listUser = [
                {
                  name: "Positivados",
                  value: this.positivados
                }
              ]
              this.loading = false
            },
            error: err => {
              console.log("erro: " + err)
            }
          })
      })
  }
}
