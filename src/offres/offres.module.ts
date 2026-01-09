import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OffersService } from './offres.service';
import { OffersController } from './offres.controller';
import { Offer, OfferSchema } from './offre.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }]),
    AuthModule, // for JwtAuthGuard
  ],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
