import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../courses/domain/entities/course.entity";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 100 })
    name: string;


    @OneToMany(() => Course, course => course.category)
    courses: Course[];
}