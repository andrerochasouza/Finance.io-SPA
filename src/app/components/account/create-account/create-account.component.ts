import { Router } from '@angular/router';
import { AccountService } from './../shared/account.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  hide = true;
  nome = new FormControl('', [Validators.required])
  email = new FormControl('', [Validators.required, Validators.email]);
  login = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])[A-Za-z\d$@$!%*?&].{8,}')])
  password = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{5,}')])

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Entre com seu Email';
    }

    return this.email.hasError('email') ? 'Email invalido!' : '';
  }

  constructor(
    private accountService: AccountService,
    private router: Router
    ) { }

  ngOnInit(): void {
    
  }

  onSubmit(value: any){
    //  this.accountService.createAccount().subscribe(result => {
    //  });
  }

}
