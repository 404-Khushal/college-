import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthController } from './auth/auth.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, CoursesModule, UsersModule, DashboardModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
