import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../course.entity";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 500 })
    video_url: string;

    @Column({ length: 500 })
    file_url: string;

    @Column('decimal', { precision: 10, scale: 2 })
    duration: number;

    @Column({ length: 150 })
    description: string;

    order: number;

    @Column({ default: false })
    published: boolean;


    @ManyToOne(() => Course, (course) => course.lessons)
    @JoinColumn({ name: 'course_id' })
    course: Course;
}