import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/user.entity";


@Entity('posts')
export class Posts {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @ManyToOne(() => User, (user) => user.posts, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    user: User
}