import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/users/user.entity";
import { Course } from "src/modules/courses/domain/entities/course.entity";
import { Sale } from "src/modules/sales/domain/sale.entity";
import { RegistrationStatus } from "../value-objects/registration.enum";

@Entity()
export class Registration {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: RegistrationStatus,
        default: RegistrationStatus.ACTIVE
    })
    status: RegistrationStatus;

    @CreateDateColumn()
    inscription_date: Date;

    // Relaciones
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Sale, (sale) => sale.registrations)
    @JoinColumn({ name: "sale_id" })
    sale: Sale;

    @ManyToOne(() => Course)
    @JoinColumn({ name: "course_id" })
    course: Course;
}