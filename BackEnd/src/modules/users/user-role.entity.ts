import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Role } from "./role/role.entity";

@Entity()
export class UserRoleEntity{
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.roles)
    @JoinColumn({ name: "user_id"})
    user: User;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: "rol_id"})
    role: Role;
}