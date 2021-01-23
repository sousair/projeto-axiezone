import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputTextComponent } from './components/inputs/input-text/input-text.component';
import { InputEmailComponent } from './components/inputs/input-email/input-email.component';
import { InputPasswordComponent } from './components/inputs/input-password/input-password.component';
import { InputTelComponent } from './components/inputs/input-tel/input-tel.component';

@NgModule({
  declarations: [
    InputTextComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputTelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    InputTextComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputTelComponent,
  ]
})
export class SharedModule { }