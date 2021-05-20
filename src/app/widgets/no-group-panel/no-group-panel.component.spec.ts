import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoGroupPanelComponent } from './no-group-panel.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('NoGroupPanelComponent', () => {
  let component: NoGroupPanelComponent;
  let fixture: ComponentFixture<NoGroupPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoGroupPanelComponent ],
      imports: [ RouterTestingModule, MatSnackBarModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoGroupPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
