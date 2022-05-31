import { CategoryDto } from 'src/categories/dto/category.dto';
import { ScreeningDto } from 'src/screenings/dto/screening.dto';
import { Movie } from '../entities/movie.model';
export class MovieDto {
  id?: number;
  title?: string;
  description?: string;
  year?: number;
  length?: number;
  imageUrl?: string;
  categories?: CategoryDto[];
  screenings?: ScreeningDto[];
  createdAt?: Date;

  constructor(movie: Movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.description = movie.description;
    this.year = movie.year;
    this.length = movie.length;
    this.imageUrl = movie.imageUrl;
    this.createdAt = movie.createdAt;
    if (movie.categories && movie.categories.isInitialized(true)) {
      this.categories = movie.categories
        .getItems()
        .map((category) => new CategoryDto(category));
    }
    if (movie.screenings && movie.screenings.isInitialized(true)) {
      this.screenings = movie.screenings
        .getItems()
        .map((screening) => new ScreeningDto({ ...screening }));
    }
  }
}
