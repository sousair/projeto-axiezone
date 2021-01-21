import { Router } from '@angular/router';
import { UserService } from './../../user.service';
import { HeaderService } from './../content-header/header.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.headerService.headerDataTitle = '';
    this.headerService.headerDataSubTitle = '';
  }

  get control() {
    return this.user.controls;
  }

  user!: FormGroup; 

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      walletAdress: ['', [Validators.required, Validators.minLength(42), Validators.maxLength(42)]],
      cell: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      nickname: ['' ,[Validators.required]]
    })
  }

  register(): void {
    this.userService.register(this.user.value).subscribe({
      next: _ => {
        this.userService.login(this.user.value).subscribe({
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
