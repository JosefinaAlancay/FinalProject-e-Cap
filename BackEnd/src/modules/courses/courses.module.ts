import { Module } from '@nestjs/common';
import { CourseService } from './application/services/course.service';
import { CourseController } from './infrastructure/controller/course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from '../registrations/domain/entities/registration.entity';
import { Course } from './domain/entities/course.entity';
import { RegistrationsModule } from '../registrations/registrations.module';
import { CourseRepository } from './domain/repositories/course.repository';
import { Category } from '../categories/domain/category.entity';
import { Instructor } from '../users/instructor/instructor.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Registration, Category, Instructor]),
    RegistrationsModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
  exports: [CourseService],
})
export class CoursesModule { }

