import { UserService } from 'src/app/core/services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(): boolean {
    if(this.userService.logged()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
