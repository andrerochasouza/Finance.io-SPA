import { DataService } from 'src/app/data.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { AccountService } from './../../../views/home/account/shared/account.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Validacoes } from '../../../shared/validatorCPF';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  formUser: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.createFormUser();
  }


  onSubmit(): void {
    if (this.formUser.valid) {
      this.accountService.getAccountAdmin(this.dataService.get('login'))
      .subscribe(admin => {
        const id = admin.idAdmin
        const createUser$ = this.userService.createUser(String(id), this.formUser.value)
        createUser$.pipe(take(1))
          .subscribe({
            next: () => {
              this.router.navigate(['/home/users'])
            },
            error: err => {
              this.accountService.showMessage('Erro ao inserir o usuário')
              console.error('Error constraint -> ' + err)
            }
          })
        });
    } else {
      this.accountService.showMessage("Erro na validação dos dados inseridos")
    }
  }

  cancel(): void {
    this.router.navigate(['/home/users'])
  }


  // Mensagem de Erro

  getErrorMessage(valueString: string) {
    if (valueString === 'name') {
      return 'Insira seu nome'
    }

    if (valueString === 'cpf') {
      return 'O CPF não é válido (somente número)'
    }

    return null
  }


  // Criando FormUser

  createFormUser(){
    this.formUser = this.formBuilder.group({
      name: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)])),
      cpf: new FormControl(null, Validators.compose([
        Validators.required,
        Validacoes.ValidaCpf]))
    });
  }
}
