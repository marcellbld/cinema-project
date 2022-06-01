import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getMovies(): Observable<Category[]> {
    return this.httpClient.get(`/api/categories`) as Observable<Category[]>;
  }
}
