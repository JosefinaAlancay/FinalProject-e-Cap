import { Module } from '@nestjs/common';
import { SaleService } from './application/service/sale/sale.service';
import { SaleController } from './infrastructure/controller/sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../courses/domain/entities/course.entity';
import { Registration } from '../registrations/domain/entities/registration.entity';
import { User } from '../users/user.entity';
import { Sale } from './domain/sale.entity';
import { Payment } from '../payments/domain/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Registration, Course, User, Payment])],
  controllers: [SaleController],
  providers: [SaleService],
  exports: [SaleService],
})
export class SalesModule { }
