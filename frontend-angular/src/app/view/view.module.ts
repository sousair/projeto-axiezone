import { AuthGuard } from './auth.guard';
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardNavComponent } from './dashboard/dashboard-nav/dashboard-nav.component';

import { Component1Component } from './dashboard/components/component1/component1.component';
import { Component2Component } from './dashboard/components/component2/component2.component';


@NgModule({
  declarations: [
    MarketplaceComponent,
    TeamComponent,
    DashboardComponent,
    DashboardNavComponent,
    Component1Component,
    Component2Component
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
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [
          AuthGuard
        ],
        children: [
          {
            path: 'component1',
            outlet: 'dbContent',
            component: Component1Component
          },
          {
            path: 'component2',
            outlet: 'dbContent',
            component: Component2Component
          }
        ]
      }
    ])
  ]
})
export class ViewModule { }