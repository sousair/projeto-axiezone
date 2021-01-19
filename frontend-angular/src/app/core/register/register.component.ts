import { Router } from '@angular/router';
import { UserService } from './../../user.service';
import { HeaderService } from './../content-header/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private router: Router
  ) { 
    this.headerService.headerDataTitle = '';
    this.headerService.headerDataSubTitle = '';
  }

  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    walletAdress: '',
    cell: '',
    nickname: ''
  }

  ngOnInit(): void {
  }

  register(): void {
    this.userService.register(this.user).subscribe({
      next: _ => {
        this.userService.login(this.user).subscribe({
          next: user => {
            localStorage.setItem('token', user.token)
            this.router.navigate(['/marketplace'])
          },
          error: error => console.error(error)
        })
      },
      error: error => console.error(error)
    })
  }

}
