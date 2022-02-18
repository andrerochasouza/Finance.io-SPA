import { AccountService } from '../views/home/account/shared/account.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private accountService: AccountService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.accountService.getAuthorizationToken();
        let request: HttpRequest<any> = req;

        if(token && !this.accountService.isTokenExpired(token)){
            request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        return next.handle(request)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            console.log('Ocorreu um erro:', error.error.message);
        } else {
          console.error(
            `Código do erro -> ${error.status}, ` +
            `Erro ${JSON.stringify(error.error)}`);
        }

        return throwError(() => 'Ocorreu um erro, tente novamente');
    }
}

