import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateAccountComponent } from './views/home/account/create-account/create-account.component';
import { LoginComponent } from './views/home/account/login/login.component';
import { AuthGuard } from './views/home/account/shared/auth.guard';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { AdminCrudComponent } from './views/home/admin-crud/admin-crud.component';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'home/users', component: AdminCrudComponent},
      {path: 'home/add/users', component: UserCreateComponent}
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'create-account', component: CreateAccountComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
