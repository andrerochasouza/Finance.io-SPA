import { Router } from '@angular/router';
import { AccountService } from './../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { PoPageLogin, PoPageLoginAuthenticationType } from '@po-ui/ng-templates';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authType = PoPageLoginAuthenticationType.Bearer
  loginPO: PoPageLogin = {
    login: '',
    password: '',
    rememberUser: false
  };

  login: any = {
    login: this.loginPO.login,
    password: this.loginPO.password
  }


  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    try{
      const result = await this.accountService.login(this.login);
      console.log(`login efetuado: ${result}`);

      // navega para a rota vazia novamente
      this.router.navigate(['']);
    } catch(error) {
      console.log(this.login)
      console.log(error);
    }
  }

}
