import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import RoutePoints from './models/route-points';
import Routes from './models/route';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-3-214-121-14.compute-1.amazonaws.com',
      port: 5432,
      username: 'psfdvhgvlhcnpl',
      password: '3006e3ce48b6783627ef3efb34a99f33ec675ea3a91db28429ff8e6dd5789533',
      database: 'd8pa8mo2pvn7jr',
      ssl: {
        rejectUnauthorized: false
      },
      url: "postgres://psfdvhgvlhcnpl:3006e3ce48b6783627ef3efb34a99f33ec675ea3a91db28429ff8e6dd5789533@ec2-3-214-121-14.compute-1.amazonaws.com:5432/d8pa8mo2pvn7jr",
      logging: true,
      synchronize: true,
      entities: [RoutePoints,
                   Routes],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
