import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Movie } from 'src/app/core/models/movie/movie';
import { MovieService } from 'src/app/core/services/movie/movie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  movies$: Observable<Movie[]> = of([]);

  constructor(
    private movieService: MovieService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies();
  }
}
