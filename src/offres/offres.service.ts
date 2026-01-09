import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer, OfferDocument } from './offre.schema';

@Injectable()
export class OffersService {
  constructor(@InjectModel(Offer.name) private offerModel: Model<OfferDocument>) {}

  async findAll(): Promise<Offer[]> {
    return this.offerModel.find().exec();
  }

  async findActive(): Promise<Offer[]> {
    const today = new Date().toISOString();
    return this.offerModel.find({ validUntil: { $gte: today } }).exec();
  }

  async findOne(id: string): Promise<Offer> {
    const offer = await this.offerModel.findById(id).exec();
    if (!offer) throw new NotFoundException('Offer not found');
    return offer;
  }

  async create(data: any): Promise<Offer> {
    const createdOffer = new this.offerModel(data);
    return createdOffer.save();
  }

  async update(id: string, data: any): Promise<Offer> {
    const updated = await this.offerModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Offer not found');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.offerModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Offer not found');
    return { message: 'Offer deleted successfully' };
  }
}
