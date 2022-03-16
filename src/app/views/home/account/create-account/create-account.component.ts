import { DataService } from 'src/app/data.service';
import { map, delay, tap, debounceTime, switchMap, first, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from './../shared/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  hide = true;
  emailExist = false
  formAdmin: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formAdmin = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(255)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(255)], this.isValidEmail()],
      login: [null, [Validators.required, Validators.maxLength(255), Validators.pattern('(?=.*[a-z])[A-Za-z\d$@$!%*?&].{7,}')], this.isValidLogin()],
      password: [null, [Validators.required, Validators.maxLength(255), Validators.pattern('(?=.*[a-z])[A-Za-z\d$@$!%*?&].{4,}')]]
    });
  }


  onSubmit() {
    if (this.formAdmin.valid) {
          this.accountService.createAccount(this.formAdmin.value)
            .pipe(take(1))
            .subscribe({
              next: () => {
                this.accountService.showMessage('Cadastro realizado... Faça o login')
                this.router.navigate(['/login'])
              },
              error: err => {
                this.accountService.showMessage('Erro no cadastro, E-mail ou Login já utilizado')
                console.error('Admin found - Error -> ' + err)
              }
            });
    } else {
      this.accountService.showMessage("Erro na validação dos dados inseridos")
    }
  }

  cancel() {
    this.router.navigate(['/login'])
  }


  getErrorMessage(valueString: string) {
    if (valueString === 'name') {
      return 'Insira seu nome'
    }

    if (valueString === 'email') {
      return 'E-mail invalido'
    }

    if (valueString === 'login') {
      return 'Minimo 8 caracteres'
    }

    if (valueString === 'password') {
      return 'Minimo 5 caracteres'
    }

    return null
  }

  isValidEmail() {
    return (control: AbstractControl) => {
        return control.valueChanges.pipe(
            debounceTime(300)
        ).pipe(
            switchMap( email => this.accountService.checkIfEmailExists(email) )
        ).pipe(
            map( taken => taken ? {emailTaken: true} : null)
        ).pipe(
            first()
        );
    };
  }

  isValidLogin() {
    return (control: AbstractControl) => {
        return control.valueChanges.pipe(
            debounceTime(300)
        ).pipe(
            switchMap( login => this.accountService.checkIfLoginExists(login) )
        ).pipe(
            map( taken => taken ? {loginTaken: true} : null)
        ).pipe(
            first()
        );
    };
  }
}
