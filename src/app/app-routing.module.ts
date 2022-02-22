import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { AppCreateComponent } from './components/user/user-view/app-create/app-create.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';
import { CreateAccountComponent } from './views/home/account/create-account/create-account.component';
import { LoginComponent } from './views/home/account/login/login.component';
import { AuthGuard } from './views/home/account/shared/auth.guard';
import { AdminCrudComponent } from './views/home/admin-crud/admin-crud.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'home/users', component: AdminCrudComponent},
      {path: 'home/user/add', component: UserCreateComponent},
      {path: 'home/user/edit/:id', component: UserEditComponent},
      {path: 'home/user/view/:id', component: UserViewComponent},
      {path: 'home/user/view/:id/app/add', component: AppCreateComponent}
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AppComponent,
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
