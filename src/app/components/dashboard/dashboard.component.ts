import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from "ng-apexcharts";
import { DataService } from 'src/app/data.service';
import { Admin } from 'src/app/views/home/account/shared/admin.model';

import { AccountService } from './../../views/home/account/shared/account.service';
import { UserService } from './../user/user.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  accountAdmin$: Observable<Admin>
  chartOptions: ChartOptions  = {
    series: [0, 0],
    chart: {
      width: 380,
      type: "pie"
    },
    labels: ["Positivado", "Negativado"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };

  // carregando pagina
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
    this.loading = true
    this.accountAdmin$.pipe(take(1))
      .subscribe(admin => {
        const poChartTotal$ = this.userService.totalValueAdmin(String(admin.idAdmin));
        poChartTotal$
          .subscribe({
            next: list => {
              this.chartOptions.series = [list[0], list[1]]
              this.loading = false
            },
            error: err => {
              console.log("erro: " + err)
            }
          })
      })
  }
}
