import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBlockComponent } from './category-block.component';

xdescribe('CategoryBlockComponent', () => {
  let component: CategoryBlockComponent;
  let fixture: ComponentFixture<CategoryBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
