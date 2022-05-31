import { Category } from '../category/category';
import { Screening } from '../screening/screening';

export interface Movie {
  id?: number;
  title?: string;
  description?: string;
  year?: number;
  length?: number;
  imageUrl?: string;
  categories?: Category[];
  screenings?: Screening[];
  createdAt?: Date;
}
