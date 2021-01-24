import { ValidateInputsService } from 'src/app/core/services/validate-inputs.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent {

  @Input() formGroup !: FormGroup;
  @Input() controlName : string = '';
  @Input() inputName : string = '';
  @Input() placeholder: string = '';
  @Input() label: string = '';

  constructor(
    public validateInputs: ValidateInputsService
  ) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
      
  }

}
