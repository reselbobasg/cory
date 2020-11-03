import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany, JoinTable, JoinColumn
} from 'typeorm';

import {Rating} from './Rating'

@Entity()
export class Capability {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Rating, rating => rating.capability)
    @JoinTable()
    ratings: Rating[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}