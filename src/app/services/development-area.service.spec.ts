import { TestBed } from '@angular/core/testing';

import { DevelopmentAreaService } from './development-area.service';

describe('DevelopmentAreaService', () => {
  let service: DevelopmentAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevelopmentAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
