import { Controller, Get, Param } from '@nestjs/common';
import { MovieDto } from 'src/movies/dto/movie.dto';
import { MoviesService } from 'src/movies/movies.service';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    private moviesService: MoviesService,
  ) {}

  @Get()
  async findAll(): Promise<CategoryDto[]> {
    return (await this.categoriesService.findAll()).map(
      (category) => new CategoryDto(category),
    );
  }
  @Get(':id')
  async findAllByCategory(
    @Param('id') categoryId: number,
  ): Promise<MovieDto[]> {
    return (await this.moviesService.findAllByCategory(categoryId)).map(
      (movie) => new MovieDto(movie),
    );
  }
}
