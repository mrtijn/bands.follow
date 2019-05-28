import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Concert } from '../concert/Concert.entity';

@Entity()
export class Artist {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    genre!: string;

    @ManyToMany(type => Concert, concert => concert.artists)
    concerts!: Concert[];

}
