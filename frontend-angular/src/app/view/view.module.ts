import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { TeamComponent } from 'src/app/view/team/team.component';
import { MarketplaceComponent } from 'src/app/view/marketplace/marketplace.component';


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
    MatIconModule,
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
