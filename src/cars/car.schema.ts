import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) brand: string;
  @Prop({ required: true, enum: ['citadine', 'mini-citadine'] }) type: string;
  @Prop({ required: true }) image: string;;
  @Prop({ required: true }) seats: number;
  @Prop({ required: true, enum: ['automatique', 'manuelle'] }) transmission: string;
  @Prop({ required: true, enum: ['petrol', 'diesel'] }) fuel: string;
  @Prop({ default: 0 }) rating: number;
  @Prop({ default: 0 }) reviews: number;
  @Prop({ default: true }) available: boolean;
  @Prop([String]) features: string[];
}

export const CarSchema = SchemaFactory.createForClass(Car);
