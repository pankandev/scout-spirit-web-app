import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappShareComponent } from './whatsapp-share.component';

describe('WhatsappShareComponent', () => {
  let component: WhatsappShareComponent;
  let fixture: ComponentFixture<WhatsappShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
