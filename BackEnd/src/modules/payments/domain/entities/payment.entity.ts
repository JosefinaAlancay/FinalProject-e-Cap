import { Sale } from "src/modules/sales/domain/sale.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentMethod, PaymentStatus } from "../value-objects/payment.enum";


@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: number;
    
    @Column({
        type: "enum",
        enum: PaymentMethod
    })
    method: PaymentMethod;

    @Column({
        type: "enum",
        enum: PaymentStatus
    })
    status: PaymentStatus;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Sale, sale => sale.payments)
    @JoinColumn({ name: "sale_id" })
    sale: Sale;
}