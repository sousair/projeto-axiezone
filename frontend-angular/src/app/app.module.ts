import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { CoreModule } from 'src/app/core/core.module';
import { ViewModule } from 'src/app/view/view.module';
import { SharedModule } from 'src/app/shared/shared.module';

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
