import { DataService } from './../../data.service';
import { Admin } from './account/shared/admin.model';
import { Observable } from 'rxjs';
import { AccountService } from './account/shared/account.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accountAdmin$: Observable<Admin>

  constructor(
    private accountService: AccountService,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.accountAdmin$ = this.accountService.getAccountAdmin(this.dataService.get('login'))
  }

  logOut(){
    this.dataService.remove('login')
    this.dataService.remove('token')
    this.router.navigate(['/login'])
  }

  navigateToHome(): void{
    this.router.navigate(['/home'])
  }
  navigateToUsers(): void{
    this.router.navigate(['/home/users'])
  }
  navigateToAddUser(): void{
    this.router.navigate(['/home/add/users'])
  }
}
