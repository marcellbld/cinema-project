import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: EntityRepository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }

  findOne(categoryId: number): Promise<Category> {
    return this.categoriesRepository.findOne(categoryId, {
      populate: ['movies', 'movies.categories'],
    });
  }
}
