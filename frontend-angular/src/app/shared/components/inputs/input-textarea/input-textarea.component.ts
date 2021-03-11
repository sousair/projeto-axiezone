import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidateInputsService } from 'src/app/core/services/validate-inputs.service';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.css']
})
export class InputTextareaComponent {

  @Input() formGroup !: FormGroup;
  @Input() controlName : string = '';
  @Input() inputName : string = '';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() classes: string = '';

  constructor(
    public validateInputs: ValidateInputsService
  ) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
