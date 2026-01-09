import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './service.schema';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service.name) private serviceModel: Model<ServiceDocument>) {}

  // Get all services
  findAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }

  // Get a single service by ID
  async findOne(id: string): Promise<Service> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  // Create a new service (admin)
  create(data: Partial<Service>): Promise<Service> {
    const newService = new this.serviceModel(data);
    return newService.save();
  }

  // Update a service (admin)
  async update(id: string, data: Partial<Service>): Promise<Service> {
    const updated = await this.serviceModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Service not found');
    return updated;
  }

  // Delete a service (admin)
  async remove(id: string): Promise<Service> {
    const deleted = await this.serviceModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Service not found');
    return deleted;
  }
}
