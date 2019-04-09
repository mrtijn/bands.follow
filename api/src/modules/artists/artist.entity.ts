import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Artists {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    spotify_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
