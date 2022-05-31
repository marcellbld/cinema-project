import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Movie } from 'src/app/core/models/movie/movie';
import { MovieService } from 'src/app/core/services/movie/movie.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent implements OnInit {
  movie$: Observable<Movie> = EMPTY;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const selectedId = Number(params.get('id'));
          return this.movieService.getMovie(selectedId);
        }),
        catchError(() => {
          this.router.navigate(['/']);
          return [];
        }),
        tap((val) => console.log(val))
      )
      .subscribe((val) => (this.movie$ = of(val)));
  }
}
