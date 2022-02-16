import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from './../shared/account.service';
import { Admin } from './../shared/admin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  login = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])[A-Za-z\d$@$!%*?&].{8,}')])
  password = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{5,}')])

  admin: Admin = {
    login: '',
    password: ''
  }

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  getErrorMessageLogin() {
    if (this.login.hasError('required')) {
      return 'Insira um novo Login';
    }
  
    return this.login.hasError('login') ? 'Mínimo de 8 caracteres!' : '';
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Insira uma nova Senha';
    }
  
    return this.password.hasError('password') ? 'Mínimo de 5 caracteres!' : '';
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.accountService.login(this.admin).subscribe(result => {
      window.localStorage.setItem('token', result),
      this.router.navigate([''])
    });
  }

  signUp(){
    this.router.navigate(['/create-account'])
  } 
}
