import { ValidateInputsService } from './../../../services/validate-inputs.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.css']
})
export class InputEmailComponent {

  @Input() formGroup !: FormGroup;
  @Input() controlName : string = '';
  @Input() inputName : string = '';
  @Input() placeholder: string = '';
  @Input() label: string = '';

  constructor(
    public validateInputs: ValidateInputsService
  ) { }

  get formControl() : AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
