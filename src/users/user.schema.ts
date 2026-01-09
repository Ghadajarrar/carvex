// src/users/user.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'CLIENT' })
  role: 'CLIENT' | 'ADMIN';

  @Prop()
  avatar?: string;

  @Prop({ type: [String], default: [] })
  favorites: string[];

  // Add reservations reference if stored in another collection
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Reservation' }], default: [] })
  reservations: Types.ObjectId[]; 
}

export const UserSchema = SchemaFactory.createForClass(User);
