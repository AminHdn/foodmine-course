import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user= this.userService.currentUser;
    if(user.token){
      request = request.clone({//request.clone next new object form current object so we are not going to change request we create new object and change some field
        setHeaders:{
          access_token:user.token//access_token same as in the backend
        }
      })
    }
    return next.handle(request);
  }
}
