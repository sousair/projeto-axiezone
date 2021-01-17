import { HeaderData } from './../../core/content-header/header-data.model';
import { HeaderService } from './../../core/content-header/header.service';
import { Team } from './../../models/team.model';
import { TeamsService } from './../../teams.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  headerData: HeaderData = {
    title: 'Marketplace',
    subtitle: 'Água'
  }

  constructor(
    private teamsService: TeamsService,
    private headerService: HeaderService
  ) { 
    this.headerService.HeaderDataTitle = this.headerData.title
    this.headerService.HeaderDataSubTitle = this.headerData.subtitle
  }

  teams: Team[] = []
  displayedColumns = ['id', 'name', 'type', 'description', 'accountId']

  ngOnInit(): void {
    this.getAllTeams()
  }

  getAllTeams(): void {
    this.teamsService.getAllTeamsWithoutPlayer().subscribe({
      next: teams => {
        console.log(teams)
        this.teams = teams
      },
      error: error => console.log('Erro', error)
    })
  }

}
