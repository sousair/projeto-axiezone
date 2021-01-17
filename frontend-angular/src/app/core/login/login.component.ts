import { HeaderService } from './../content-header/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private headerService: HeaderService
  ){
    this.headerService.headerDataTitle = ''
    this.headerService.headerDataSubTitle = ''
  }

  ngOnInit(): void {
  }

}
