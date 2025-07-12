import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleName } from "./role.enum";
import { UserRoleEntity } from "../user-role.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: RoleName,
        unique: true
    })
    name: RoleName;

    @OneToMany(() => UserRoleEntity, (user_role) => user_role.role)
    users: UserRoleEntity[];

}