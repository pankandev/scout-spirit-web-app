import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryRegistryComponent } from './beneficiary-registry.component';

describe('BeneficiaryRegistryComponent', () => {
  let component: BeneficiaryRegistryComponent;
  let fixture: ComponentFixture<BeneficiaryRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaryRegistryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
