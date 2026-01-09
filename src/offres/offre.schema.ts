import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema()
export class Offer {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) description: string;
  @Prop({ required: true }) discount: number;
  @Prop() duration?: string;
  @Prop({ required: true }) image: string;
  @Prop({ required: true }) validUntil: string; // ISO date string
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
