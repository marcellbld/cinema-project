import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<CategoryDto[]> {
    return (await this.categoriesService.findAll()).map(
      (category) => new CategoryDto(category),
    );
  }
}
