import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitIconComponent } from './unit-icon.component';

describe('StageIconComponent', () => {
  let component: UnitIconComponent;
  let fixture: ComponentFixture<UnitIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
