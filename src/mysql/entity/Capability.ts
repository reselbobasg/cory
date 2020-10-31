import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany, JoinTable
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

    @ManyToMany(type => Rating, {
        cascade: true
    })
    @JoinTable()
    ratings: Rating[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}