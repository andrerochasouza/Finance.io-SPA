import { take } from 'rxjs';
import { AccountService } from './../../../../views/home/account/shared/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WalletService } from './../wallet.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-edit',
  templateUrl: './app-edit.component.html',
  styleUrls: ['./app-edit.component.css']
})
export class AppEditComponent implements OnInit {

  formApp: FormGroup;
  idUser: number
  idApp: number
  nameOld: string
  valueOld: number
  typeOld: string
  descricaoOld: string | undefined

  typeAplications = [
    'RECEITA',
    'DESPESA'
  ]

  constructor(
    private walletService: WalletService,
    private router: Router,
    private routeActivated: ActivatedRoute,
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) {
    this.routeActivated.params.subscribe(params => {
      this.idUser = params['id']
      this.idApp = params['idapp']
    });
  }

  ngOnInit(): void {
    this.getUserOld();
    this.updateFormApp();
  }


  onSubmit(): void {
    if (this.formApp.valid) {
      this.walletService.updateApp(this.formApp.value, this.idUser, this.idApp)
        .pipe(
          take(1)
        )
        .subscribe({
          next: () => {
            this.router.navigate([`/home/user/wallet/${this.idUser}`])
          },
          error: err => {
            this.accountService.showMessage('Erro ao atualizar a aplicação: ' + err)
            console.error('Error constraint -> ' + err)
          }
        });
    } else {
      this.accountService.showMessage("Erro na validação dos dados inseridos")
    }
  }

  cancel(): void {
    this.router.navigate([`/home/user/wallet/${this.idUser}`])
  }


  // Mensagem de Erro

  getErrorMessage(valueString: string) {
    if (valueString === 'name') {
      return 'Insira um nome para aplicação'
    }

    if (valueString === 'value') {
      return 'O valor não é válido (somente número)'
    }

    if (valueString === 'typeAplication') {
      return 'Selecione um tipo de aplicação'
    }

    return null
  }

  // Retorna o nome do Usuário antigo

  getUserOld() {
    return this.walletService.appById(this.idUser, this.idApp)
      .pipe(
        take(1)
      )
      .subscribe(app => {
        this.nameOld = app.name
        this.valueOld = app.value
        this.typeOld = app.typeAplication
        this.descricaoOld = app.descricao
      })
  }

  // Criando FormUser
  updateFormApp() {
    this.formApp = this.formBuilder.group({
      name: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)])),
      value: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.maxLength(255)])),
      typeAplication: new FormControl(null, Validators.compose([
        Validators.required])),
      descricao: new FormControl(null, Validators.compose([
        Validators.nullValidator,
        Validators.maxLength(255)])),
    });
  }

}
