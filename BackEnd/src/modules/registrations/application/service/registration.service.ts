import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/modules/courses/domain/entities/course.entity';
import { Sale } from 'src/modules/sales/domain/sale.entity';
import { User } from 'src/modules/users/user.entity';
import { Repository } from 'typeorm';
import { Registration } from '../../domain/entities/registration.entity';
import { RegistrationStatus } from '../../domain/value-objects/registration.enum';
import { CreateRegistrationDto } from '../dto/CreateRegistrationDTO';

@Injectable()
export class RegistrationService {
    constructor(
        @InjectRepository(Registration)
        private registrationRepo: Repository<Registration>,

        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(Sale)
        private saleRepo: Repository<Sale>,

        @InjectRepository(Course)
        private courseRepo: Repository<Course>
    ) { }

    async createRegistration(dto: CreateRegistrationDto): Promise<Registration> {
        const user = await this.userRepo.findOneBy({ id: dto.userId });
        const sale = await this.saleRepo.findOneBy({ id: dto.saleId });
        const course = await this.courseRepo.findOneBy({ id: dto.courseId });

        if (!user || !sale || !course) {
            throw new NotFoundException('User, Sale or Course not found');
        }

        const registration = this.registrationRepo.create({
            status: dto.status,
            sale,
            course,
            user,
        });

        return await this.registrationRepo.save(registration);
    }


    async findAll(): Promise<Registration[]> {
        return this.registrationRepo.find({
            relations: ['user', 'course', 'sale'],
        });
    }

    async findByUser(userId: number): Promise<Registration[]> {
        return this.registrationRepo
            .createQueryBuilder('registration')
            .leftJoinAndSelect('registration.user', 'user')
            .leftJoinAndSelect('registration.course', 'course')
            .leftJoinAndSelect('registration.sale', 'sale')
            .where('user.id = :userId', { userId })
            .getMany();
    }

    async updateStatus(id: number, status: RegistrationStatus): Promise<Registration> {
        const registration = await this.registrationRepo.findOneBy({ id });
        if (!registration) throw new NotFoundException('Registration not found');

        registration.status = status;
        return await this.registrationRepo.save(registration);
    }

    async countStudentsInCourse(courseId: number): Promise<number> {
        return await this.registrationRepo.count({
            where: {
                course: { id: courseId },
                status: RegistrationStatus.ACTIVE,
            },
        });
    }

}
