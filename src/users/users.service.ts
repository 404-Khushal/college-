import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/role.enum';

// Service contains business logic
@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };

    return this.usersRepository.create(userWithHashedPassword);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findByRole(role: Role): Promise<User[]> {
    return this.usersRepository.findByRole(role);
  }
}
