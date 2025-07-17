import { Column, Entity, JoinColumn, NumericType, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "../user.entity";
import { Course } from "src/modules/courses/domain/entities/course.entity";


@Entity()
export class Instructor {
    @PrimaryColumn()
    user_id: number;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ length: 100 })
    biography: string;

    @Column('float', { default: 0 })
    rating: number

    @Column({ length: 50 })
    studies: string;

    @OneToMany(() => Course, course => course.instructor)
    courses: Course[];
}