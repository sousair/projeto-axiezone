import { MarketplaceModule } from './marketplace/marketplace.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'marketplace',
        pathMatch: 'full'
      }
    ]),
    BrowserAnimationsModule,
    CoreModule,
    MarketplaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
