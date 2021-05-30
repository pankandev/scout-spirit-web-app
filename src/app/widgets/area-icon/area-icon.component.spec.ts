import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaIconComponent } from './area-icon.component';

describe('AreaIconComponent', () => {
  let component: AreaIconComponent;
  let fixture: ComponentFixture<AreaIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
