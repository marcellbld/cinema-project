import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MovieBlockComponent } from './movie-block.component';

describe('MovieBlockComponent', () => {
  let component: MovieBlockComponent;
  let fixture: ComponentFixture<MovieBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieBlockComponent);
    component = fixture.componentInstance;

    component.movie = {
      title: 'Valami Film',
      description: 'desc',
      year: 1990,
      categories: [
        {
          name: 'Horror',
        },
        {
          name: 'Thriller',
        },
      ],
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the title of the movie', () => {
    const title = fixture.debugElement.query(By.css('#title'));
    expect(title.nativeElement.textContent).toBe('Valami Film');
  });
});
