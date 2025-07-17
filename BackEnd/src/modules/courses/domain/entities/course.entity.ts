import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseLevel, CourseStatus } from "../value-objects/course.enum";
import { Category } from "src/modules/categories/category.entity";
import { Instructor } from "src/modules/users/instructor/instructor.entity";
import { Lesson } from "src/modules/lessons/lesson.entity";

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