import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPanelComponent } from './confirm-panel.component';

describe('ConfirmPanelComponent', () => {
  let component: ConfirmPanelComponent;
  let fixture: ComponentFixture<ConfirmPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPanelComponent ]
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
