import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { CarsModule } from './cars/cars.module';
import { ReservationsModule } from './reservations/reservations.module';
import { OffersModule } from './offres/offres.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/carvex'),
    AuthModule,
    UsersModule,
    CarsModule,
     ConfigModule,
    ReservationsModule,
    OffersModule,
    ServicesModule,
  ],
})
export class AppModule {}


