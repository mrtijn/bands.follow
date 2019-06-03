import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Concert } from '../concert/Concert.entity';

@Entity()
export class Artist {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(type => Concert, concert => concert.artists)
    concerts!: Concert[];

    @Column()
    spotify_id!: string;

}
