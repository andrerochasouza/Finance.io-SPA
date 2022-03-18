import { AccountService } from './../../../../views/home/account/shared/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WalletService } from './../wallet.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-create',
  templateUrl: './app-create.component.html',
  styleUrls: ['./app-create.component.css']
})
export class AppCreateComponent implements OnInit {

  formApp: FormGroup;
  idUser: number;
  typeAplications = [
    'RECEITA',
    'DESPESA'
  ]

  constructor(
    private walletService: WalletService,
    private router: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private routeActivated: ActivatedRoute
  ) {
    this.routeActivated.params.subscribe(params => this.idUser = params['id']);
   }

  ngOnInit(): void {
    this.createFormApp();
  }


  onSubmit(): void {
    if (this.formApp.valid) {
      this.walletService.createApp(this.formApp.value, this.idUser)
        .subscribe({
          next: () => {
            this.router.navigate([`/home/user/wallet`, this.idUser])
          },
          error: err => {
            this.accountService.showMessage('Erro ao inserir a Aplicação')
            console.error('Error constraint -> ' + err)
          }
        });
    } else {
      this.accountService.showMessage("Erro na validação dos dados inseridos")
    }
  }

  cancel(): void {
    this.router.navigate([`/home/user/wallet`, this.idUser])
  }


  // Mensagem de Erro

  getErrorMessage(valueString: string) {
    if (valueString === 'name') {
      return 'Insira o nome da aplicação'
    }

    if (valueString === 'value') {
      return 'O valor não é válido (somente número)'
    }

    if (valueString === 'typeAplication') {
      return 'Selecione um tipo de aplicação'
    }

    if (valueString === 'descricao') {
      return '0/255'
    }

    return null
  }


  // Criando formAPP

  createFormApp() {
    this.formApp = this.formBuilder.group({
      name: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)])),
      value: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.maxLength(255)])),
      typeAplication: new FormControl(null, Validators.compose([
        Validators.required])),
      descricao: new FormControl(null, Validators.maxLength(255))
    });
  }

}
