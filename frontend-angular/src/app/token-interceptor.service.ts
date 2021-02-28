import { UserService } from 'src/app/core/services/user.service';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private userService: UserService
  ) { }


  intercept(req: { clone: (arg0: { setHeaders: { Authorization: any; }; }) => any; }, next: any) {
    return next.handle(req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userService.getToken()}`
      }
    }))
  }
}