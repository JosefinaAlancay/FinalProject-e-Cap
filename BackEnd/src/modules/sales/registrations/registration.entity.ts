import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RegistrationStatus } from "./registration.enum";
import { Sale } from "../sale.entity";
import { User } from "src/modules/users/user.entity";
import { Course } from "src/modules/courses/domain/entities/course.entity";

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
    @ManyToMany(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Sale, (sale) => sale.registrations)
    @JoinColumn({ name: "sale_id" })
    sale: Sale;

    @ManyToOne(() => Course)
    @JoinColumn({ name: "course_id" })
    course: Course;
}