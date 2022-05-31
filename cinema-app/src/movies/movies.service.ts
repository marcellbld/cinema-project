import { LoadStrategy } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './entities/movie.model';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: EntityRepository<Movie>,
    private categoriesService: CategoriesService,
  ) {}

  async create(movieDto: MovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create({
      ...movieDto,
      categories: [],
    });

    for (const c of movieDto.categories) {
      movie.categories.add(await this.categoriesService.findOne(c.id));
    }

    await this.moviesRepository.persistAndFlush(movie);

    return movie;
  }

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.findAll({
      populate: ['categories'],
    });
  }

  findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findOne(id, {
      populate: ['categories', 'screenings'],
    });
  }

  async findAllByCategory(categoryId: number): Promise<Movie[]> {
    const category = await this.categoriesService.findOne(categoryId);

    if (!category) {
      throw new BadRequestException("Category doesn't exists");
    }

    return category.movies.getItems();
  }
}
