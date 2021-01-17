import { HeaderService } from './header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css']
})
export class ContentHeaderComponent implements OnInit {

  constructor(
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
  }

  get title(): string {
    return this.headerService.headerDataTitle
  }

  get subtitle(): string {
    return this.headerService.headerDataSubTitle
  }

}
