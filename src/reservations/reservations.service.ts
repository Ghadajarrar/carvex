// src/reservations/reservations.service.ts
import { Injectable, NotFoundException , BadRequestException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './reservation.schema';
import { CarsService } from '../cars/cars.service';
import { MailService } from './mail.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
    private carsService: CarsService,
    private mailService: MailService,
  ) {}

  // Admin: get all reservations
  findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().exec();
  }

  // Client: get reservations for a specific user
  findByUser(userId: string): Promise<Reservation[]> {
    return this.reservationModel.find({ userId }).exec();
  }

 async create(data: Partial<Reservation>): Promise<Reservation> {

  if (!data.carId) {
    throw new BadRequestException('carId is required');
  }

  const car = await this.carsService.findOne(data.carId);
  if (!car) throw new NotFoundException('Voiture introuvable');

  const newReservation = new this.reservationModel({
    ...data,
    carName: car.name,
  });

 const savedReservation = await newReservation.save();

try {
  await this.mailService.sendReservationEmail('ghada.jarrarr@gmail.com', {
    userName: savedReservation.userName!,
    userEmail: savedReservation.userEmail!,
    userPhone: savedReservation.userPhone!,
    carName: car.name,
    startDate: savedReservation.startDate,
    endDate: savedReservation.endDate,
    location: savedReservation.pickupLocation,
  });
} catch (e) {
  console.error('Email failed but reservation saved');
}

return savedReservation;
 }

  // Update reservation status (admin)
  async updateStatus(
    id: string,
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled',
  ): Promise<Reservation> {
    const updated = await this.reservationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).exec();

    if (!updated) throw new NotFoundException('Réservation introuvable');
    return updated;
  }

  // Delete reservation (admin)
  async remove(id: string): Promise<Reservation> {
    const deleted = await this.reservationModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Réservation introuvable');
    return deleted;
  }
}
