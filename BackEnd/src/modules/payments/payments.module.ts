import { Module } from '@nestjs/common';
import { PaymentService } from './application/service/payment.service';
import { PaymentController } from './infrastructure/controller/payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from '../registrations/domain/entities/registration.entity';
import { Sale } from '../sales/domain/sale.entity';
import { Payment } from './domain/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Sale, Registration])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentsModule { }
