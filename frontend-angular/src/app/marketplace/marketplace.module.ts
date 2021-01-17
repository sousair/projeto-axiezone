import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    MarketplaceComponent
    ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    RouterModule.forChild([
      {
        path: 'marketplace',
        component: MarketplaceComponent
      }
    ])
  ]
})
export class MarketplaceModule { }
