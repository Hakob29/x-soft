import { Posts } from "src/posts/posts.entity";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";


export enum Role {
    User = "User",
    Admin = "Admin"
}



@Entity('user')
export class User {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @Column({ type: String })
    username: string

    @Column({ type: String, unique: true })
    email: string

    @Column({ type: String })
    password: string

    @Column("enum", { enum: Role, name: "role", array: true, default: [Role.User] })
    roles: Role[]

    @OneToMany(() => Posts, (posts) => posts.user, { cascade: true })
    posts: Posts[]

    @CreateDateColumn({ type: Date })
    createdAt: Date

    @UpdateDateColumn({ type: Date })
    updatedAt: Date

    @DeleteDateColumn({ type: Date })
    deletedAt?: Date

}