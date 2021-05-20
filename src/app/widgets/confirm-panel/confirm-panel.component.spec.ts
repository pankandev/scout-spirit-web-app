import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmPanelComponent} from './confirm-panel.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('ConfirmPanelComponent', () => {
  let component: ConfirmPanelComponent;
  let fixture: ComponentFixture<ConfirmPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmPanelComponent],
      imports: [RouterTestingModule, MatSnackBarModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
