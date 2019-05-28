import {Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Artist } from '../artist/Artist.entity';

@Entity()
export class Concert {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    location_id!: string;

    @ManyToMany(type => Artist, artists => artists.concerts)
    @JoinTable()
    artists!: Artist[];

}

// @Entity()
// export class ConcertArtists {

//     @PrimaryColumn()
//     concert_id!: string;

//     @Column()
//     artist_id!: string;

// }
