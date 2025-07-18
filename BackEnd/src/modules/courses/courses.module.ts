import { Module } from '@nestjs/common';
import { CourseService } from './application/services/course.service';
import { CourseController } from './infrastructure/controller/course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from '../registrations/domain/entities/registration.entity';
import { Course } from './domain/entities/course.entity';
import { RegistrationsModule } from '../registrations/registrations.module';
import { CourseRepository } from './domain/repositories/course.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Registration]),
    RegistrationsModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
  exports: [CourseService],
})
export class CoursesModule { }

