import { Admin } from './../shared/admin.model';
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

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(loginPO: PoPageLogin){
    let admin: Admin = {
      login: loginPO.login,
      password: loginPO.password 
    }

    this.accountService.login(admin).subscribe(result => {
      window.localStorage.setItem('token', result),
      this.router.navigate([''])
    });

      
        
        
        
    // try{
    //   const result = await this.accountService.login(this.login);
    //   console.log(`login efetuado: ${result}`);

    //   // navega para a rota vazia novamente
    //   this.router.navigate(['']);
    // } catch(error) {
    //   console.log(this.login)
    //   console.log(error);
    // }
  }

}
