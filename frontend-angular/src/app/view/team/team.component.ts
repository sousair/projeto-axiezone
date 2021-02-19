import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/core/content-header/header.service';
import { TeamsService } from 'src/app/core/services/teams.service';
import { CardService } from 'src/app/core/services/card.service';
import { Card } from 'src/app/models/card.model';
import { Axie } from 'src/app/models/axie.model';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService,
    private headerService: HeaderService,
    private cardService: CardService
  ) { }

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

  ngOnInit(): void {
    this.headerService.headerDataTitle = '';
    this.headerService.headerDataSubTitle = '';

    this.getTeam();
  }

  getTeam(): void {
    const id = + (this.route.snapshot.paramMap.get("id") || 0);
    this.teamsService.getTeamById(id).subscribe({
      next: team => {
        team.axies.forEach((axie, axieIndex) => this.getAxieCards(axie, axieIndex));
        this.team = team;
      },
      error: error => console.error(error)
    })
  }

  getAxieCards(axie: Axie, axieIndex:number): void {
    axie.parts.forEach((part: Card, partIndex) => {
      this.cardService.getCard(part).subscribe({
        next: card => this.team.axies[axieIndex].parts[partIndex] = card,
        error: error => console.error(error)
      })
    })
  }

}