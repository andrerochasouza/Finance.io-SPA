import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserReadComponent } from './components/user/user-read/user-read.component';
import { AppCreateComponent } from './components/user/user-view/app-create/app-create.component';
import { AppEditComponent } from './components/user/user-view/app-edit/app-edit.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';
import { CreateAccountComponent } from './views/home/account/create-account/create-account.component';
import { LoginComponent } from './views/home/account/login/login.component';
import { AuthGuard } from './views/home/account/shared/auth.guard';
import { HomeComponent } from './views/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [

      // home
      {path: 'home', component: HomeComponent},

      // página com a lista de usuários
      {path: 'home/dashboard', component: DashboardComponent},
      {path: 'home/users', component: UserReadComponent},
      {path: 'home/user/add', component: UserCreateComponent},
      {path: 'home/user/edit/:id', component: UserEditComponent},

      // página com a lista de aplicações
      {path: 'home/user/wallet/:id', component: UserViewComponent},
      {path: 'home/user/wallet/:id/app/add', component: AppCreateComponent},
      {path: 'home/user/wallet/:id/app/edit/:idapp', component: AppEditComponent}
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AppComponent,
    children: [

      // login e create account
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
