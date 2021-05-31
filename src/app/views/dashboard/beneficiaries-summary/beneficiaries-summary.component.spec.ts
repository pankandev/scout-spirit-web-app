import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesSummaryComponent } from './beneficiaries-summary.component';

describe('BeneficiariesSummaryComponent', () => {
  let component: BeneficiariesSummaryComponent;
  let fixture: ComponentFixture<BeneficiariesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiariesSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiariesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
