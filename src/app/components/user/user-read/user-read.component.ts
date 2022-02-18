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


  constructor(
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.listUser$ = this.userService.listUser()
  }
}
