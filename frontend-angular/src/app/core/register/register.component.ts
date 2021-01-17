import { HeaderService } from './../content-header/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private headerService: HeaderService
  ) { 
    this.headerService.headerDataTitle = '';
    this.headerService.headerDataSubTitle = '';
  }

  ngOnInit(): void {
  }

}
