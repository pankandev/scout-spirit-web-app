import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageSelectComponent } from './stage-select.component';

describe('StageSelectComponent', () => {
  let component: StageSelectComponent;
  let fixture: ComponentFixture<StageSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StageSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
