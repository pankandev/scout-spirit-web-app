import { TestBed } from '@angular/core/testing';

import { EmailParamGuard } from './email-param.guard';
import {RouterTestingModule} from '@angular/router/testing';

describe('EmailParamGuard', () => {
  let guard: EmailParamGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ]
    });
    guard = TestBed.inject(EmailParamGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
