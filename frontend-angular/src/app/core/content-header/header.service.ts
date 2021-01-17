import { HeaderData } from './header-data.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData: HeaderData = {
    title: '',
    subtitle: ''
  }

  constructor() { }

  get headerDataTitle():string {
    return this._headerData.title
  }
  
  set HeaderDataTitle(title: string) {
    this._headerData.title = title
  }
  
  get headerDataSubTitle(): string {
    return this._headerData.subtitle
  }

  set HeaderDataSubTitle(subtitle: string) {
    this._headerData.subtitle = subtitle
  }

}
