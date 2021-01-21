import { CardService } from './../../card.service';
import { Axie } from './../../models/axie.model';
import { HeaderService } from './../../core/content-header/header.service';
import { Team } from './../../models/team.model';
import { TeamsService } from './../../teams.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team : Team = { // Inicializado apenas pro angular não reclamar
    id: 0,
    name: '',
    type: '',
    rent: 0,
    playerId: 0,
    description: '',
    cashPolitic: '',
    devolutionPolitic: '',
    addInfo: '',
    accountId: '',
    imgUrl: '',
    axies: [] 
  }

  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService,
    private headerService: HeaderService,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
    const id = + (this.route.snapshot.paramMap.get("id") || 0);
    this.teamsService.getTeamById(id).subscribe({
      next: team => {
        team.axies.forEach((axie, index) => {
          axie.parts.forEach((part, partIndex) => {
            this.cardService.getCard(part).subscribe({
              next: card => {
                this.team = team;
                this.team.axies[index].parts[partIndex] = card;
              },
              error: error => console.error(error)
            })
          })
        })
      },
      error: error => console.error(error)
    })

    this.headerService.headerDataTitle = '';
    this.headerService.headerDataSubTitle = '';
  }

}
