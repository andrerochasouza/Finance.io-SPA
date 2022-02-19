import { CdkTableModule } from '@angular/cdk/table';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserReadComponent } from './components/user/user-read/user-read.component';
import { httpInterceptorProviders } from './http-interceptors';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { CreateAccountComponent } from './views/home/account/create-account/create-account.component';
import { LoginComponent } from './views/home/account/login/login.component';
import { AdminCrudComponent } from './views/home/admin-crud/admin-crud.component';
import { HomePageComponent } from './views/home/home-page/home-page.component';
import { HomeComponent } from './views/home/home.component';
import { GreenColorDirective } from './shared-directives/green-color.directive';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserReadComponent,
    AdminCrudComponent,
    HomeComponent,
    LoginComponent,
    CreateAccountComponent,
    AuthenticationComponent,
    HomePageComponent,
    GreenColorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatSidenavModule,
    MatIconModule,
    MatSnackBarModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
