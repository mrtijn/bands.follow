import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Concert } from '../concert/Concert.entity';

@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column()
    lat!: string;

    @Column()
    lng!: string;

    @OneToMany(type => Concert, concert => concert.location)
    concerts!: Concert[];
}
