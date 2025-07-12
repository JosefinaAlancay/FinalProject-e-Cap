import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../courses/course.entity";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 100 })
    name: string;

    @Column()
    category_id: number;

    @OneToMany(() => Course, course => course.category)
    courses: Course[];
}