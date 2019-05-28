import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
}
