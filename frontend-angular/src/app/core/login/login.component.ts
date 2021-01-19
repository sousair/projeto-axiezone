import { UserService } from './../../user.service';
import { HeaderService } from './../content-header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private router: Router
  ){
    this.headerService.headerDataTitle = '';
    this.headerService.headerDataSubTitle = '';
  }

  user = {
    email: '',
    password: ''
  }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login(this.user).subscribe({
      next: user => {
        localStorage.setItem('token',  user.token);
        this.router.navigate(['/marketplace'])
      }
    })
    
  }

}
