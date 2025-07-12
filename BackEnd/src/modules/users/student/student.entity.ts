import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
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

    @Column()
    last_access: Date;
}