import { TestBed } from '@angular/core/testing';

import { ValidateInputsService } from './validate-inputs.service';

describe('ValidateInputsService', () => {
  let service: ValidateInputsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateInputsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
