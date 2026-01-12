import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class AuthService {
constructor(
private usersService:UsersService,
private jwtService:JwtService
){}

async signup(data:any){
const hashed = await bcrypt.hash(data.password,10);

return this.usersService.create({
  email:data.email,
  password:hashed,
  role:data.role
});


}

async login(data:any){
const user = await this.usersService.findByEmail(data.email);

const match = await bcrypt.compare(data.password,user.password);

if(!match){
  return {message:'Invalid credentials'};
}
const token = this.jwtService.sign({
  id:user._id,
  role:user.role
});

return {token};


}
}