import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from 'src/modules/registrations/domain/entities/registration.entity';
import { RegistrationStatus } from 'src/modules/registrations/domain/value-objects/registration.enum';
import { Sale } from 'src/modules/sales/domain/sale.entity';
import { Repository } from 'typeorm';
import { Payment } from '../../domain/entities/payment.entity';
import { PaymentStatus } from '../../domain/value-objects/payment.enum';
import { CreatePaymentDTO } from '../dto/CreatePaymentDTO';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepo: Repository<Payment>,

        @InjectRepository(Registration)
        private registrationRepo: Repository<Registration>,

        @InjectRepository(Sale)
        private saleRepo: Repository<Sale>,
    ) { }

    async registerPayment(dto: CreatePaymentDTO): Promise<Payment> {
        const sale = await this.saleRepo.findOne({
            where: { id: dto.saleId },
            relations: ['registrations'],
        });

        if (!sale) throw new NotFoundException('Sale not found');

        const payment = this.paymentRepo.create({
            amount: dto.amount,
            method: dto.method,
            status: dto.status,
            sale: sale,
        });
        const savedPayment = await this.paymentRepo.save(payment);

        if (dto.status === PaymentStatus.APPROVED) {
            const registrations = await this.registrationRepo.find({
                where: { sale: { id: dto.saleId } },
            });

            for (const reg of registrations) {
                reg.status = RegistrationStatus.ACTIVE;
                await this.registrationRepo.save(reg);
            }
        }

        return savedPayment;
    }
}
