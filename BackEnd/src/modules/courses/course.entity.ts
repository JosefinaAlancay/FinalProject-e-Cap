import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../categories/category.entity";
import { CourseLevel, CourseStatus } from "./course.enum";
import { User } from "../users/user.entity";
import { Lesson } from "./lessons/lesson.entity";
import { Instructor } from "../users/instructor/instructor.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 100 })
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('decimal', { precision: 10, scale: 2 })
    discount: number;

    @Column()
    imagen_url: string;

    @Column({
        type: 'enum',
        enum: CourseStatus,
        default: CourseStatus.ACTIVE
    })
    status: CourseStatus;

    @Column({
        type: 'enum',
        enum: CourseLevel,
    })
    level: CourseLevel;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_At: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_At: Date;

    @ManyToOne(() => Category, (category) => category.courses)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => Instructor, instructor => instructor.courses, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    instructor: Instructor;

    @OneToMany(() => Lesson, (lesson) => lesson.course)
    lessons: Lesson[];
}