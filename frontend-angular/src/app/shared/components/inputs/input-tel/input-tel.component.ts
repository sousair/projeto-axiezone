import { Component, Input} from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidateInputsService } from 'src/app/shared/services/validate-inputs.service';

@Component({
  selector: 'app-input-tel',
  templateUrl: './input-tel.component.html',
  styleUrls: ['./input-tel.component.css']
})
export class InputTelComponent {

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
