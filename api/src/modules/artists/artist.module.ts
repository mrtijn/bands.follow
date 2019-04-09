import { Module } from '@nestjs/common';
import { artistController } from './artist.controller';
import { artistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artists } from './artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artists])],
  controllers: [artistController],
  providers: [artistService],
})
export class artistModule {}