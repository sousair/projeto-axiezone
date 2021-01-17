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
  
  private rootUrl: string = 'http://localhost:3000'
  user?: object

  login(user: object): void {
    this.httpClient.post(`${this.rootUrl}/signin`, user).subscribe({
      next: (user) => this.user = user,
    })
  }

  register(user: object): Observable<any> {
    return this.httpClient.post(`${this.rootUrl}/signup`, user)
  }

}
