import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/enums/role.enum';

// This creates the "sign on the door"
export const ROLES_KEY = 'roles'; 
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// Usage: @Roles(Role.ADMIN, Role.PROFESSOR)
