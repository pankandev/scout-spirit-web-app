import { TestBed } from '@angular/core/testing';

import { EmailParamGuard } from './email-param.guard';

describe('EmailParamGuard', () => {
  let guard: EmailParamGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmailParamGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
