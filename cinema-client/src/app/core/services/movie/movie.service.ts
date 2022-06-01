import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  getMovie(id: number): Observable<Movie> {
    return this.httpClient.get(`/api/movies/${id}`) as Observable<Movie>;
  }

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get(`/api/movies`) as Observable<Movie[]>;
  }

  create(movieDto: Movie): Observable<Movie> {
    return this.httpClient.post(`/api/movies`, movieDto) as Observable<Movie>;
  }
}
