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
    private userService: UserService
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
      next: _ => this.userService.login(this.user), // Login depois do registro
      error: error => console.error(error)
    })
  }

}
