import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidateInputsService } from 'src/app/core/services/validate-inputs.service';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.css']
})
export class InputPasswordComponent {

  @Input() formGroup !: FormGroup;
  @Input() controlName : string = '';
  @Input() inputName : string = '';
  @Input() label: string = '';

  constructor(
    public validateInputs: ValidateInputsService
  ) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
      
  }

}
