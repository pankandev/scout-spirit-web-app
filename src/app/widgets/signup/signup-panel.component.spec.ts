import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignupPanelComponent} from './signup-panel.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('SignupPanelComponent', () => {
  let component: SignupPanelComponent;
  let fixture: ComponentFixture<SignupPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupPanelComponent],
      imports: [RouterTestingModule, MatSnackBarModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
