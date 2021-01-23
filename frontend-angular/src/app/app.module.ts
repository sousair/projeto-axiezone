import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { ViewModule } from './view/view.module';
import { SharedModule } from './shared/shared.module';

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
    SharedModule,
    ViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
