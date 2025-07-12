import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoleEntity } from "./user-role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    last_name: string;

    @Column(({ unique: true, length: 150 }))
    email: string;

    Birthdate: Date;

    @Column()
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_At: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_At: Date;

    @OneToMany(() => UserRoleEntity, (user_role) => user_role.user, { cascade: true })
    roles: UserRoleEntity[]
}