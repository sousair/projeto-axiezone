import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputTextComponent } from 'src/app/shared/components/inputs/input-text/input-text.component';
import { InputEmailComponent } from 'src/app/shared/components/inputs/input-email/input-email.component';
import { InputPasswordComponent } from 'src/app/shared/components/inputs/input-password/input-password.component';
import { InputTelComponent } from 'src/app/shared/components/inputs/input-tel/input-tel.component';
import { InputNumberComponent } from './components/inputs/input-number/input-number.component';
import { InputTextareaComponent } from './components/inputs/input-textarea/input-textarea.component';

@NgModule({
  declarations: [
    InputTextComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputTelComponent,
    InputNumberComponent,
    InputTextareaComponent
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
    InputNumberComponent,
    InputTextareaComponent
  ]
})
export class SharedModule { }
