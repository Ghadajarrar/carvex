import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation, ReservationSchema } from './reservation.schema';
import { AuthModule } from '../auth/auth.module';
import {CarsModule} from '../cars/cars.module';
import {MailModule} from '../reservations/mail.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
    AuthModule, // Needed for JwtAuthGuard
     CarsModule,  // ✅ Needed to inject CarsService
    MailModule, 
  ],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
