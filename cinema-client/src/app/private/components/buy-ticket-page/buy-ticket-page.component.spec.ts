import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTicketPageComponent } from './buy-ticket-page.component';

xdescribe('BuyTicketPageComponent', () => {
  let component: BuyTicketPageComponent;
  let fixture: ComponentFixture<BuyTicketPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyTicketPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTicketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
