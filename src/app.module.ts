import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { ProfessorsModule } from './professors/professors.module';
import { CoursesModule } from './courses/courses.module';
import { DatabaseModule } from './database/database.config';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true, 
      //envFilePath: '/.env',
    }),
    DatabaseModule,

   
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     uri: configService.get<string>('mongodb://localhost:27017/university'),
    //   }),
    // }),

   
    AuthModule,
    UsersModule,
    StudentsModule,
    ProfessorsModule,
    CoursesModule,
  ],
})
export class AppModule {}
