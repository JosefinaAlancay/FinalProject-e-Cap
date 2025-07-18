import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user.entity";

@Entity()
export class Student {
    @PrimaryColumn()
    user_id:number;

    @OneToOne(() => User)
    @JoinColumn({ name:"user_id" })
    user: User;

    @Column()
    completed_courses: number;

    @UpdateDateColumn()
    last_access: Date;
}