import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  findAll() {
    return this.model.find();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  findByEmail(email: string) {
    return this.model.findOne({ email });
  }

  create(userData: any) {
    return this.model.create(userData);
  }

  async update(id: string, updateData: Partial<User>) {
    const updatedUser = await this.model.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.model.findByIdAndDelete(id);
    if (!deletedUser) throw new NotFoundException('User not found');
    return deletedUser;
  }
}
