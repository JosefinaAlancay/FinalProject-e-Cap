import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "../courses/domain/entities/course.entity";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 500 })
    video_url?: string;

    @Column({ length: 500 })
    file_url?: string;

    @Column('decimal', { precision: 10, scale: 2 })
    duration: number;

    @Column({ length: 150 })
    description: string;

    order: number;

    @Column({ default: false })
    published: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 

    @ManyToOne(() => Course, (course) => course.lessons)
    @JoinColumn({ name: 'course_id' })
    course: Course;
}