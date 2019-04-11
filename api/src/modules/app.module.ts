import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { artistModule }  from './artists/artist.module';

@Module({
  imports: [
    artistModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'band_follow',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
  ],
})
export class AppModule {}
