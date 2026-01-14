import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../common/role.enum';

// Repository handles ALL database operations
@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // Create new user
  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  // Find user by email (used for login)
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({ email: email.toLowerCase() })
      .select('+password') // Include password for login check
      .exec();
  }

  // Find user by ID
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Find users by role
  async findByRole(role: Role): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }

  // Update user
  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  // Delete user
  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
