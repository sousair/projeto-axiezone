import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private serverUrl: string = 'http://localhost:3000';

  logged(): boolean {
    return !!localStorage.getItem('token');
  }

  login(user: object): Observable<any> {
    return this.httpClient.post<any>(`${this.serverUrl}/signin`, user);
  }

  register(user: object): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/signup`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}