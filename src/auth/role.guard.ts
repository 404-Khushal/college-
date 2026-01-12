
import { CanActivate, ExecutionContext } from '@nestjs/common';

export class RolesGuard implements CanActivate {
constructor(private role: string) {}

canActivate(context: ExecutionContext): boolean {
const req = context.switchToHttp().getRequest();
return req.user.role === this.role;
}
}