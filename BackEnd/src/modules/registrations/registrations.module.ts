import { Module } from '@nestjs/common';
import { RegistrationService } from './application/service/registration.service';
import { RegistrationController } from './infrastructure/controller/registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../courses/domain/entities/course.entity';
import { Sale } from '../sales/domain/sale.entity';
import { User } from '../users/user.entity';
import { Registration } from './domain/entities/registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registration, User, Course, Sale])],
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService],
})
export class RegistrationsModule {}
