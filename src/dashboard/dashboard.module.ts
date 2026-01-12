import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UsersModule } from '../users/users.module';
import { CoursesModule } from '../courses/courses.module';
import { UsersService } from '../users/users.service';
import { CoursesService } from '../courses/courses.service';

@Module({
imports:[UsersModule,CoursesModule],
controllers:[DashboardController],
providers:[DashboardService]
})
export class DashboardModule {}
