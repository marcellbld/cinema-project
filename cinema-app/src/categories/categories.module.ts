import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.model';
import { CategoriesService } from './categories.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Category] })],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
