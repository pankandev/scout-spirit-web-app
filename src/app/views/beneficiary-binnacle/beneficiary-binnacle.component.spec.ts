import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryBinnacleComponent } from './beneficiary-binnacle.component';

describe('BeneficiaryBinnacleComponent', () => {
  let component: BeneficiaryBinnacleComponent;
  let fixture: ComponentFixture<BeneficiaryBinnacleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaryBinnacleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryBinnacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
