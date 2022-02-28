import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

import { AccountService } from './../shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  formAdmin: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) { }


  ngOnInit(): void {
    this.formAdmin = this.formBuilder.group({
      login: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])[A-Za-z\d$@$!%*?&].{7,}')]),
      password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])[A-Za-z\d$@$!%*?&].{4,}')])
    });
  }

  getErrorMessage(valueString: string){
    if(valueString === 'login'){
      return 'Minimo 8 caracteres'
    }

    if(valueString === 'password'){
      return 'Minimo 5 caracteres'
    }

    return null
  }


  onSubmit(){
    if(this.formAdmin.valid){
      this.accountService.login(this.formAdmin.value)
        .subscribe({
          next: result => {
            window.localStorage.setItem('token', result),
            this.accountService.showMessage('Entrando...')
            this.dataService.set('login', this.formAdmin.get('login')?.value)
            this.router.navigate(['home/users'])
          },
          error: err => {
            this.accountService.showMessage('Erro no login')
            console.error('Admin not found - Error -> ' + err)
          }
        });
    } else {
      this.accountService.showMessage('Login e senha incorretos')
    }
  }

  signUp(){
    this.router.navigate(['/create-account'])
  }
}
