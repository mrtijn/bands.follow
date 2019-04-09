import { Controller, Get, Post, Request, Response, Body } from '@nestjs/common';
import { artistService } from './artist.service';
import { createArtistDto } from './dto/createArtist.dto';

@Controller('artists')
export class artistController {
    constructor(
        private readonly artistService : artistService
    ){}
    @Get('all')
    findAllArtists() : Array<string>{
        return ['1', '2', '3'];
    }

    @Post('create')
    async createArtist(@Body() createArtistDto: createArtistDto) {
        console.log(createArtistDto);
        try {
            await this.artistService.createArtist(createArtistDto);
        } catch (error) {
            console.log(error);
        }
        return createArtistDto;
    }

}