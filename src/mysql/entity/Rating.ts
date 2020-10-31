import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,ManyToOne} from 'typeorm';import {Person} from './Person';import {Capability} from './Capability'import {Vendor} from './Vendor'import {Feature} from './Feature'@Entity()export class Rating {    @PrimaryGeneratedColumn("uuid")    id: string;    @Column()    score: number;    @Column()    comment: string;    @Column(type => Person)    reviewer: Person    @Column(type => Capability)    capability: Capability    @Column(type => Feature)    feature: Feature    @Column(type => Vendor)    vendor: Vendor    @CreateDateColumn()    createdAt: Date;    @UpdateDateColumn()    updatedAt: Date;}