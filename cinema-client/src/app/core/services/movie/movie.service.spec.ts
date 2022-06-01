import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMovies', () => {
    it('should create a get request to /api/movies', async () => {
      service.getMovies().subscribe();

      httpTestingController.expectOne('/api/movies').flush([]);

      httpTestingController.verify();
    });
    it('should return the result of the request', () => {
      service.getMovies().subscribe((value) => {
        expect(value).toEqual([]);
      });

      httpTestingController.expectOne('/api/movies').flush([]);

      httpTestingController.verify();
    });
  });
});
