import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ required: true }) carId: string;

  @Prop({ required: true }) carName: string; // new: store car name

  @Prop({ required: true }) userId: string;
  @Prop({ required: true }) userName: string;
 
  @Prop({ required: true }) userEmail: string;
  @Prop() userPhone?: string; // optional
  @Prop({ required: true }) pickupLocation: string;

  @Prop({ required: true }) startDate: string;
  @Prop({ required: true }) endDate: string;

  @Prop({ required: true, default: 0 }) totalPrice: number;

  @Prop({ 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
    default: 'pending' 
  })
  status: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
