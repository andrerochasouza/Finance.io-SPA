import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './../user';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})

export class UserReadComponent implements OnInit {


  listUser$: Observable<User[]>
  isValueP = false
  isValueN = false
  isValueE = false

  constructor(
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.listUser$ = this.userService.listUser()
  }

  isValuePositiveNg(walletValue: number | undefined): boolean{
    if(walletValue != undefined){
     if(walletValue > 0){
      return true
     } else {
      return false
     }
    }
    return false
  }

  isValueNegativeNg(walletValue: number | undefined): boolean{
    if(walletValue != undefined){
     if(walletValue < 0){
      return true
     } else {
      return false
     }
    }
    return false
  }

  isValueCalculatorNg(walletValue: number | undefined): boolean{
    if(walletValue != undefined){
      if(walletValue > 0){
        this.isValueP = true
        this.isValueN = false
        this.isValueE = false
      } else if(walletValue < 0) {
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
