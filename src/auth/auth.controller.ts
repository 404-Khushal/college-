import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
constructor(private service:AuthService){}

@Post('signup')
signup(@Body() body:any){
return this.service.signup(body);
}

@Post('login')
login(@Body() body:any){
return this.service.login(body);
}
}