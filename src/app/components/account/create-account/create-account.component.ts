import { Admin } from './../shared/admin.model';
import { Router } from '@angular/router';
import { AccountService } from './../shared/account.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  admin: Admin = {
    name: '',
    email: '',
    login: '',
    password: ''
  }

  constructor(
    private accountService: AccountService,
    private router: Router
    ) { }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Entre com seu Email';
    }
  
    return this.email.hasError('email') ? 'Email invalido!' : '';
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    if(this.nome.valid && this.email.valid && this.login.valid && this.password.valid){
      this.accountService.createAccount(this.admin).subscribe(admin => {
        alert(admin)
        // this.router.navigate(['/login'])
      })
    }
  }

  cancel(){
    this.router.navigate(['/login'])
  }

}