import { Module } from '@nestjs/common';
import { CategoriesService } from './application/service/categories.service';
import { CategoriesController } from './infrastructure/controller/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './domain/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule { }
