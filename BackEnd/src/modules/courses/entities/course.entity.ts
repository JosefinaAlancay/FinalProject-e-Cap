import { Column, Decimal128, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { User } from "src/modules/users/entities/user.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany(() => User, user => user.courses)
    @JoinTable()
    instructors: User[];

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    discount: number;

    @Column()
    imagen_url: string;

    @Column()
    level: string;

    @Column()
    state: boolean;

    @Column()
    duration: Date;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @ManyToOne(() => Category, category => category.courses)
    category: Category
}