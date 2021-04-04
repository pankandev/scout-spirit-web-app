import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAvatarComponent } from './new-avatar.component';

describe('NewAvatarComponent', () => {
  let component: NewAvatarComponent;
  let fixture: ComponentFixture<NewAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
