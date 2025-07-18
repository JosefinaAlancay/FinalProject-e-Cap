import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/modules/courses/domain/entities/course.entity';
import { Registration } from 'src/modules/registrations/domain/entities/registration.entity';
import { RegistrationStatus } from 'src/modules/registrations/domain/value-objects/registration.enum';
import { Sale } from 'src/modules/sales/domain/sale.entity';
import { User } from 'src/modules/users/user.entity';
import { Repository } from 'typeorm';
import { CreateSaleDTO } from '../../dto/CreateSaleDTO';
import { Payment } from 'src/modules/payments/domain/entities/payment.entity';
import { PaymentMethod, PaymentStatus } from 'src/modules/payments/domain/value-objects/payment.enum';

@Injectable()
export class SaleService {
    constructor(
        @InjectRepository(Sale)
        private saleRepo: Repository<Sale>,

        @InjectRepository(Registration)
        private registrationRepo: Repository<Registration>,

        @InjectRepository(Payment)
        private paymentRepo: Repository<Payment>,

        @InjectRepository(Course)
        private courseRepo: Repository<Course>,

        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }


    async createSale(dto: CreateSaleDTO): Promise<Sale> {
        const user = await this.userRepo.findOneBy({ id: dto.userId });
        if (!user) throw new NotFoundException('User not found');

        const course = await this.courseRepo.findOneBy({ id: dto.courseId });
        if (!course) throw new NotFoundException('Course not found');

        const total = course.price - course.discount;

        const sale = this.saleRepo.create({
            total,
            user,
        });
        const savedSale = await this.saleRepo.save(sale);

        await this.registrationRepo.save({
            user,
            sale: savedSale,
            course,
            status: RegistrationStatus.PENDING,
        });

        await this.paymentRepo.save({
            sale: savedSale,
            amount: total,
            method: PaymentMethod.MERCADO_PAGO,
            status: PaymentStatus.PENDING,
        });

        return savedSale;
    }

}
