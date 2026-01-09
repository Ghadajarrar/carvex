// src/cars/cars.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './car.schema';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  findAll(): Promise<Car[]> {
    return this.carModel.find().exec();
  }

  async findOne(id: string): Promise<Car> {
    const car = await this.carModel.findById(id).exec();
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }

  create(data: Partial<Car>): Promise<Car> {
    const newCar = new this.carModel(data);
    return newCar.save();
  }

  async update(id: string, data: Partial<Car>): Promise<Car> {
    const updated = await this.carModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Car not found');
    return updated;
  }

  async remove(id: string): Promise<Car> {
    const deleted = await this.carModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Car not found');
    return deleted;
  }
  
}
