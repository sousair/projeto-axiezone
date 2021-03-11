import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';

import { DashboardComponent } from './dashboard.component';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardNavComponent,
    CreateTeamComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [
          AuthGuard
        ],
        children: [
          {
            path: 'registerTeam',
            outlet: 'dbContent',
            component: CreateTeamComponent
          }
        ]
      }
    ])
  ]
})
export class DashboardModule { }
