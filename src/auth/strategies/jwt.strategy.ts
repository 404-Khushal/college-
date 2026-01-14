import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

// This validates JWT tokens
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Get token from "Authorization: Bearer <token>"
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // This runs AFTER token is verified
  // payload = decoded JWT data
  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub);
    
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or inactive');
    }

    // This user object gets attached to request.user
    return { 
      id: user._id, 
      email: user.email, 
      role: user.role 
    };
  }
}
