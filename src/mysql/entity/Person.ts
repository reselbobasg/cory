import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, OneToMany, ManyToMany, JoinTable
} from 'typeorm';
import {Rating} from "./Rating";
import {Vendor} from "./Vendor"

@Entity()
export class Person {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Rating, rating => rating.reviewer)
    ratings:Rating[];

    @ManyToMany(type => Vendor, {
        cascade: true
    })
    @JoinTable()
    vendors:Vendor[]
}