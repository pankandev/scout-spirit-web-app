import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaRankingComponent } from './area-ranking.component';

describe('AreaRankingComponent', () => {
  let component: AreaRankingComponent;
  let fixture: ComponentFixture<AreaRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
