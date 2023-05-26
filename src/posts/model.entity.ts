import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import { Mark } from "./mark.entity";

@Entity("model")
export class Model {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @Column({ type: String })
    name: string

    @Column({ type: Number })
    price: number

    @Column({ type: Number })
    year: number

    @Column({ type: Number })
    engine: number

    @Column({ type: String })
    color: string

    @ManyToOne(() => Mark, (mark) => mark.model, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    mark: Mark

    @CreateDateColumn({ type: Date })
    createdAt: Date

    @UpdateDateColumn({ type: Date })
    updatedAt: Date

    @DeleteDateColumn({ type: Date })
    deletedAt?: Date

}