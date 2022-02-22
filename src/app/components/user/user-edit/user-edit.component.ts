import { delay, take } from 'rxjs';
import { Validacoes } from './../../../shared/validatorCPF';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from './../../../views/home/account/shared/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  formUser: FormGroup;
  idUser: number
  nameOld: string
  cpfOld: string

  constructor(
    private userService: UserService,
    private router: Router,
    private routeActivated: ActivatedRoute,
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) {
    this.routeActivated.params.subscribe(params => this.idUser = params['id']);
  }

  ngOnInit(): void {
    this.getUserOld();
    this.updateFormUser();
  }


  onSubmit(): void {
    if (this.formUser.valid) {
      this.userService.updateUser(this.formUser.value)
        .pipe(
          take(1)
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/home/users'])
          },
          error: err => {
            this.accountService.showMessage('Erro ao atualizar o usuário: ' + err)
            console.error('Error constraint -> ' + err)
          }
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
      return 'Insira seu novo nome (Minimo 5 caracteres)'
    }

    if (valueString === 'cpf') {
      return 'O CPF não é válido (somente número)'
    }

    return null
  }

  // Retorna o nome do Usuário antigo

  getUserOld() {
    return this.userService.userById(this.idUser)
      .pipe(
        take(1)
      )
      .subscribe(user => {
        this.nameOld = user.name
        this.cpfOld = user.cpf
      })
  }

  // Criando FormUser
  updateFormUser() {
    this.formUser = this.formBuilder.group({
      id: new FormControl(this.idUser),
      name: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)])),
      cpf: new FormControl(null, Validators.compose([
        Validators.required,
        Validacoes.ValidaCpf]))
    });
  }

}
