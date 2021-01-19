import { UserService } from './../../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  // Angular estava reclamando de eu usar uma variavel privada no template
  // então armazenei numa variável qualquer
  
  alo = this.userService

  ngOnInit(): void {
  }

}
