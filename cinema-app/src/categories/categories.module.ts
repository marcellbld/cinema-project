import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.model';
import { CategoriesService } from './categories.service';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Category] }), MoviesModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
