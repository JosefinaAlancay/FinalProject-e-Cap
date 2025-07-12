import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Role } from "./role/role.entity";

@Entity()
export class UserRoleEntity{
    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    role_id:number;

    @ManyToOne(() => User, (user) => user.roles)
    user: User;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: "rol_id"})
    role: Role;
}