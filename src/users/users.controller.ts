import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

// Controller handles HTTP requests
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // Protect all routes
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET /users - Only admins can see all users
  @Get()
  @Roles(Role.ADMIN) // This is the "sign on the door"
  async findAll() {
    return this.usersService.findAll();
  }
}
