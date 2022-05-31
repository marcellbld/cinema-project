import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningBarComponent } from './screening-bar.component';

describe('ScreeningBarComponent', () => {
  let component: ScreeningBarComponent;
  let fixture: ComponentFixture<ScreeningBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
