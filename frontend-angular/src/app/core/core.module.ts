import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { ContentHeaderComponent } from './content-header/content-header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ContentHeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    HeaderComponent,
    ContentHeaderComponent
  ]
})
export class CoreModule { }
