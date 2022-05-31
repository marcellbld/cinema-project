import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../models/category/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getMovies(): Observable<Category[]> {
    return this.httpClient.get(
      `${environment.apiUrl}/categories`
    ) as Observable<Category[]>;
  }
}
