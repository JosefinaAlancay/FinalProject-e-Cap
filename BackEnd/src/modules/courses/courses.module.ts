import { Module } from '@nestjs/common';
import { CourseService } from './application/services/course.service';
import { CourseController } from './infrastructure/controller/course.controller';
import { CourseRepository } from './domain/repositories/course.repository';



@Module({
  providers: [CourseService, CourseRepository],
  controllers: [CourseController]
})
export class CoursesModule {}
