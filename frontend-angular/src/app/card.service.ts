import { Card } from './models/card.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  private cardsUrl = 'http://localhost:3000/cards'

  getCard(part: any): Observable<Card> {
    return this.httpClient.get<Card>(`${this.cardsUrl}/${part.name}/${part.type}`)
  } 

}
