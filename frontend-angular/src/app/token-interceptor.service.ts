import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  token = localStorage.getItem('token');

  intercept(req: { clone: (arg0: { setHeaders: { Authorization: any; }; }) => any; }, next: any) {
    return next.handle(req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    }))
  }


}
