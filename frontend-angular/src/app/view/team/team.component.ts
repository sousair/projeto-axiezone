import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from './../../core/content-header/header.service';
import { TeamsService } from '../../shared/services/teams.service';
import { CardService } from '../../shared/services/card.service';
import { Card } from './../../models/card.model';
import { Axie } from './../../models/axie.model';
import { Team } from './../../models/team.model';

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

    this.getTeam();
 
    this.headerService.headerDataTitle = '';
    this.headerService.headerDataSubTitle = '';
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
