import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutersComponent } from './scouters.component';

describe('ScoutersComponent', () => {
  let component: ScoutersComponent;
  let fixture: ComponentFixture<ScoutersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoutersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
