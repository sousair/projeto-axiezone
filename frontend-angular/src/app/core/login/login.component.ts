import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from './../content-header/header.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ){
    this.headerService.headerDataTitle = '';
    this.headerService.headerDataSubTitle = '';
  }

  user !: FormGroup;

  get control() {
    return this.user.controls;
  }

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login(): void {
    this.userService.login(this.user.value).subscribe({
      next: user => {
        localStorage.setItem('token',  user.token);
        this.router.navigate(['/marketplace']);
      },
      error: error => console.error(error)
    })
    
  }

}
