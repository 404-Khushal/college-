import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom decorator to get current logged-in user
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // JWT strategy attaches user to request
  },
);

// Usage in controller: 
// async getProfile(@CurrentUser() user: User) { ... }
