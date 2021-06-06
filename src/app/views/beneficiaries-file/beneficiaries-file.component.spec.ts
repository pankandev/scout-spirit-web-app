import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesFileComponent } from './beneficiaries-file.component';

describe('BeneficiariesFileComponent', () => {
  let component: BeneficiariesFileComponent;
  let fixture: ComponentFixture<BeneficiariesFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiariesFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiariesFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
