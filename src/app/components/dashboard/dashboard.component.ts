import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Observable, take } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Admin } from 'src/app/views/home/account/shared/admin.model';

import { AccountService } from './../../views/home/account/shared/account.service';
import { UserService } from './../user/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  // chart config data
  label: string = "R$"
  single: any
  view: any[number] = [500, 400];
  listUser: any[]
  showLegend: boolean = true;
  showLabels: boolean = true;


  // options
  colorScheme: Color = {
    name: "red",
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25'],
  };

  // http request get
  valueTotalPos: number
  pos: number
  valueTotalNeg: number
  neg: number
  idAdmin: string

  // loading http request get
  loading = true;

  constructor(
    private accountService: AccountService,
    private dataService: DataService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.graphicUser();
  }

  graphicUser(): void {
    this.accountService.getAccountAdmin(this.dataService.get('login'))
      .pipe(take(1))
      .subscribe(admin => {
        this.userService.listUser(String(admin.idAdmin))
          .pipe(take(1))
          .subscribe({
            next: list => {

              this.valueTotalPos = 0
              this.valueTotalNeg = 0
              this.pos = 0
              this.neg = 0

              list.forEach(user => {
                if (user.walletValue) {
                  if (user.walletValue >= 0) {
                    this.valueTotalPos += user.walletValue
                    this.pos++
                  } else {
                    this.valueTotalNeg += Math.abs(user.walletValue)
                    this.neg++
                  }
                } else {
                  this.pos++
                }
              })

              this.listUser = [
                {
                  name: "Positivados",
                  value: this.valueTotalPos
                },
                {
                  name: "Negativados",
                  value: this.valueTotalNeg
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
