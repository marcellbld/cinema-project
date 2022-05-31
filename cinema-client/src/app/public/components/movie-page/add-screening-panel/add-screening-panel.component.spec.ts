import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScreeningPanelComponent } from './add-screening-panel.component';

describe('AddScreeningPanelComponent', () => {
  let component: AddScreeningPanelComponent;
  let fixture: ComponentFixture<AddScreeningPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScreeningPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScreeningPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
