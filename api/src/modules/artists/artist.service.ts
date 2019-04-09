import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artists } from './artist.entity';
import { Repository } from 'typeorm';
import { Artist } from './interfaces/artist.interface';


@Injectable()
export class artistService {
    constructor(
        @InjectRepository(Artists)
        private readonly artistRepository : Repository<Artists>
    ) {}

    async findAllArtists(){
        return await this.artistRepository.find();
    }

    async createArtist(artist: Artist): Promise<Artist> {
        console.log('create with repo');
        return await this.artistRepository.save(artist);
    }
}