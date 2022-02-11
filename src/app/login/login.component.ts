import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  form:FormGroup;

  constructor(private fb:FormBuilder, 
              private loginService: LoginService, 
              private router: Router) {

  this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }


  onSubmit() {

    const val = this.form.value;
    
    // if (val.email && val.password) {
    //     this.loginService.login(val.login, val.password)
    //         .subscribe(
    //             () => {
    //                 console.log("User is logged in");
    //                 this.router.navigateByUrl('/');
    //             }
    //         );
    // }
  }
}
