import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDecorationComponent } from './new-decoration.component';

describe('NewDecorationComponent', () => {
  let component: NewDecorationComponent;
  let fixture: ComponentFixture<NewDecorationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDecorationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDecorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
