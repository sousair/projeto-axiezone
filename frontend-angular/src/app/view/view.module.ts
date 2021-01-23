import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list'

import { TeamComponent } from './team/team.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';


@NgModule({
  declarations: [
    MarketplaceComponent,
    TeamComponent
    ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    RouterModule.forChild([
      {
        path: 'marketplace',
        component: MarketplaceComponent
      },
      {
        path: 'marketplace/:id',
        component: TeamComponent
      }
    ])
  ]
})
export class ViewModule { }
