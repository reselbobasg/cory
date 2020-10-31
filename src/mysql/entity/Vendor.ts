import {Entity,
    PrimaryGeneratedColumn,
    Column, CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable} from 'typeorm';
import {Person} from "./Person";

@Entity()
export class Vendor {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToMany(type => Person, {
        cascade: true
    })
    @JoinTable()
    contacts: Person[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}