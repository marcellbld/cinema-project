import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../../models/movie/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  getMovie(id: number): Observable<Movie> {
    return this.httpClient.get(
      `${environment.apiUrl}/movies/${id}`
    ) as Observable<Movie>;
  }

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get(`${environment.apiUrl}/movies`) as Observable<
      Movie[]
    >;
  }

  create(movieDto: Movie): Observable<Movie> {
    return this.httpClient.post(
      `${environment.apiUrl}/movies`,
      movieDto
    ) as Observable<Movie>;
  }
}
