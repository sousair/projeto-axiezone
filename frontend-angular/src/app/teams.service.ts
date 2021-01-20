import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Team } from './models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private teamsUrl: string = 'http://localhost:3000/teams'
  
  getAllTeamsWithoutPlayer(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(this.teamsUrl)
  }

  getTeamById(id: number): Observable<Team> {
    return this.httpClient.get<Team>(`${this.teamsUrl}/${id}`)
  }

}
