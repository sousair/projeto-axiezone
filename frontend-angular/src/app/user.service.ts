import { User } from './models/user.model';
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
  
  private rootUrl: string = 'http://localhost:3000';

  user: User = {
    id: 0,
    name: '',
    email: '',
    nickname: '',
    cell: '',
    walletAdress: '',
    hasTeam: false,
    admin: false,
    iat: 0,
    exp: 0,
    token: ''
  }

  login(user: object): void {
    this.httpClient.post<User>(`${this.rootUrl}/signin`, user).subscribe({
      next: user => {
        this.user = user;
        console.log(this.user)
      },
      error: error => console.error(error)
    })
  }

  register(user: object): Observable<any> {
    return this.httpClient.post(`${this.rootUrl}/signup`, user)
  }

}