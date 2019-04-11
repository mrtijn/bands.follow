import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artists } from './artist.entity';
import { Repository } from 'typeorm';
import { Artist } from './interfaces/artist.interface';
import { createArtistDto } from './dto/createArtist.dto';


@Injectable()
export class artistService {
    constructor(
        @InjectRepository(Artists)
        private readonly artistRepository : Repository<Artists>
    ) {}

    async findAllArtists(){
        return await this.artistRepository.find();
    }

    async createArtist(artist: createArtistDto): Promise<Artist> {
        console.log('create with repo');
        return await this.artistRepository.save(artist);
    }
}