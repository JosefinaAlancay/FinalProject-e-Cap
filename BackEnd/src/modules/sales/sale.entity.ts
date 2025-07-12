import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Registration } from "./registrations/registration.entity";
import { Payment } from "./payment.entity";

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    date: Date;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total: number;

    // Relaciones
    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(() => Registration, registration => registration.sale)
    registrations: Registration[];

    @OneToMany(() => Payment, payment => payment.sale)
    payments: Payment[];
    
}