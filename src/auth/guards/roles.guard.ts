import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

// Guard: "Does your role match what's required?"
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Step 1: Read the "sign on the door" (@Roles decorator)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(), // Check the method (e.g., findAll())
      context.getClass(),   // Check the class (e.g., UsersController)
    ]);

    // Step 2: If no sign (no @Roles decorator), let everyone in
    if (!requiredRoles) {
      return true;
    }

    // Step 3: Get the user from the request (added by JwtAuthGuard)
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Step 4: Check if user's role matches any required role
    const hasRole = requiredRoles.includes(user.role);
    
    if (!hasRole) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
