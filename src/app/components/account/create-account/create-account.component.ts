import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from './../shared/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  hide = true;
  formAdmin: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.formAdmin = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      login: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])[A-Za-z\d$@$!%*?&].{7,}')]),
      password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])[A-Za-z\d$@$!%*?&].{4,}')])
    })
  }

  getErrorMessage(valueString: string){
    if(valueString === 'name'){
      return 'Insira seu nome'
    }

    if(valueString === 'email'){
      return 'E-mail incorreto'
    }

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
      this.accountService.isValidEmail(this.formAdmin.get('email')?.value).pipe()
      .subscribe(isValidEmail => {
        // this.accountService.isValidLogin(this.formAdmin.get('login')?.value).subscribe(isValidLogin => {
        //   let variavel: number = this.accountService.verifyValidEmailAndLogin(isValidEmail, isValidLogin)

        //   if(variavel == 3){
        //     // this.accountService.createAccount(this.formAdmin.value).subscribe(admin => {
        //     //   alert('admin -> ' + admin.name)
        //     // });
        //     alert('admin ')
        //   } else if(variavel == 2) {
        //     alert('Login já está sendo utilizado')
        //   } else if(variavel == 1){
        //     alert('E-mail já está sendo utilizado')
        //   } else {
        //     alert('E-mail e Login já está sendo utilizado')
        //   }
        // });
      });
    }
  }

  cancel(){
    this.router.navigate(['/login'])
  }

}
