import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenGroupComponent } from './forbidden-group.component';

describe('ForbiddenGroupComponent', () => {
  let component: ForbiddenGroupComponent;
  let fixture: ComponentFixture<ForbiddenGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForbiddenGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForbiddenGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
