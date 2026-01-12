import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/role.guard';

@Controller('dashboard')
export class DashboardController {
constructor(private service: DashboardService) {}

@UseGuards(JwtGuard, new RolesGuard('student'))
@Get('student')
student(@Req() req) {
return this.service.student(req.user.id);
}

@UseGuards(JwtGuard, new RolesGuard('professor'))
@Get('professor')
professor(@Req() req) {
return this.service.professor(req.user.id);
}

@UseGuards(JwtGuard, new RolesGuard('admin'))
@Get('admin')
admin() {
return this.service.admin();
}
}