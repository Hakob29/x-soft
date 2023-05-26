import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Model } from "./model.entity";


@Entity("mark")
export class Mark {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @Column({ type: String })
    name: string

    @OneToMany(() => Model, (model) => model.mark, { cascade: true })
    model: Model[]

    @CreateDateColumn({ type: Date })
    createdAt: Date

    @UpdateDateColumn({ type: Date })
    updatedAt: Date

    @DeleteDateColumn({ type: Date })
    deletedAt?: Date


}