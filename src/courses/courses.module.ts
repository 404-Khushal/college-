import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './courses.schema';

@Module({
imports:[
MongooseModule.forFeature([{name:'Course',schema:CourseSchema}])
],
controllers:[CoursesController],
providers:[CoursesService],
exports: [CoursesService]
})
export class CoursesModule {}
