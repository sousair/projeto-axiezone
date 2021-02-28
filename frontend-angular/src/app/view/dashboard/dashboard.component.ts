import { UserService } from 'src/app/core/services/user.service';
import { HeaderData } from './../../core/content-header/header-data.model';
import { HeaderService } from 'src/app/core/content-header/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  headerData: HeaderData = {
    title: 'Dashboard',
    subtitle: 'Descrição e funcionalidades do dashboard...'
  }

  constructor(
    private headerService: HeaderService,
    private userService: UserService
  ) {
    this.headerService.headerDataTitle = this.headerData.title;
    this.headerService.headerDataSubTitle = this.headerData.subtitle;
   }

  ngOnInit(): void {
    this.userService.verifyToken().subscribe({
      next: res => {
        if(!res.valid) this.userService.logout();
      },
      error: error => console.error(error)
    })
  }

}
