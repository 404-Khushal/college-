import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Register new user
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);

    if (!user) {
      throw new Error('Failed to create user');
    }
    
    // Generate JWT token
    const token = this.generateToken(user);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      access_token: token,
    };
  }

  // Login existing user
  async login(loginDto: LoginDto) {
    // Find user with password
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      access_token: token,
    };
  }

  // Generate JWT token
  private generateToken(user: any): string {
    const payload = { 
      sub: user._id,  // 'sub' is standard JWT field for user ID
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }
}
