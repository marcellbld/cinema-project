import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatBlockComponent } from './seat-block.component';

xdescribe('SeatBlockComponent', () => {
  let component: SeatBlockComponent;
  let fixture: ComponentFixture<SeatBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeatBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
