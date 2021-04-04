import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardNewComponent } from './reward-new.component';

describe('RewardNewComponent', () => {
  let component: RewardNewComponent;
  let fixture: ComponentFixture<RewardNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
