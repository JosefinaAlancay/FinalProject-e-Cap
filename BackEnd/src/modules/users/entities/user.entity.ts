import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Course } from "src/modules/courses/entities/course.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    occupation: string;

    @Column()
    created_at:Date;

    @Column()
    updated_at: Date;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable()
    roles: Role[];

    @ManyToMany(() => Course, course => course.instructors)
    courses: Course[]


}