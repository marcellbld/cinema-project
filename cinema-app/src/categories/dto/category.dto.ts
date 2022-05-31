import { Category } from '../entities/category.model';

export class CategoryDto {
  id?: number;
  name?: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
  }
}
