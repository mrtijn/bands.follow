import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import { Artist } from '../artist/Artist.entity';
import { Location } from '../location/Location.entity';
@Entity()
export class Concert {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: 'datetime', nullable: true })
    date!: Date;

    @ManyToMany(type => Artist, artists => artists.concerts)
    @JoinTable()
    artists!: Artist[];

    @ManyToOne(type => Location, location => location.concerts)
    location!: Location;

}