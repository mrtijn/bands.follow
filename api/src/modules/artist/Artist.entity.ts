import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Concert } from '../concert/Concert.entity';
import { SpotifyData } from '../../services/spotify/spotify.model';

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

    data!: SpotifyData

}

