import { take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './../user/user.service';
import { DataService } from 'src/app/data.service';
import { AccountService } from './../../views/home/account/shared/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  poChart = [
    { label: 'Endividados', data: 10 },
    { label: 'Positivos', data: 10 }
  ]

  constructor(
    private accountService: AccountService,
    private dataService: DataService,
    private userService: UserService,
    private router: Router ) { }

  ngOnInit(): void {
    this.totalValueApp();
  }

  totalValueApp(): void{
    this.accountService.getAccountAdmin(this.dataService.get('login'))
      .pipe(take(1))
      .subscribe(admin => {
        const id = admin.idAdmin
        const poChartTotal$ = this.userService.totalValueAdmin(String(id));
        poChartTotal$.pipe(take(1))
          .subscribe(list => {
            console.log(list[0])
            this.poChart[0].data = list[0];
            this.poChart[1].data = list[1];
          })
      })
  }

}
