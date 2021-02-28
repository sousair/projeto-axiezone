import { Component, OnInit } from '@angular/core';

import { HeaderData } from 'src/app/core/content-header/header-data.model';
import { HeaderService } from 'src/app/core/content-header/header.service';
import { Team } from 'src/app/models/team.model';
import { TeamsService } from 'src/app/core/services/teams.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  headerData: HeaderData = {
    title: 'Marketplace',
    subtitle: 'Descrição do marketplace, etc.'
  }

  constructor(
    private teamsService: TeamsService,
    private headerService: HeaderService
  ) { 
    this.headerService.headerDataTitle = this.headerData.title;
    this.headerService.headerDataSubTitle = this.headerData.subtitle;
  }

  teams: Team[] = [];
  displayedColumns = ['id', 'name', 'type', 'description', 'accountId', 'seeMore'];

  ngOnInit(): void {
    this.getAllTeams();
  }

  getAllTeams(): void {
    this.teamsService.getAllTeamsWithoutPlayer().subscribe({
      next: teams => this.teams = teams,
      error: error => console.log(error)
    })
  }

}
