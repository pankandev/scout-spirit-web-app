import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoGroupPanelComponent } from './no-group-panel.component';

describe('NoGroupPanelComponent', () => {
  let component: NoGroupPanelComponent;
  let fixture: ComponentFixture<NoGroupPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoGroupPanelComponent ]
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
