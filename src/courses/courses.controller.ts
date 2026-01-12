import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/role.guard';

@Controller('courses')
export class CoursesController {
constructor(private service:CoursesService){}

@UseGuards(JwtGuard, new RolesGuard('admin'))
@Post()
create(@Body() body:any){
return this.service.create(body);
}

@UseGuards(JwtGuard, new RolesGuard('admin'))
@Get()
getAll(){
return this.service.findAll();
}

@UseGuards(JwtGuard, new RolesGuard('admin'))
@Post('assign-professor')
assignProfessor(@Body() body:any) {
return this.service.assignProfessor(body.courseId, body.professorId);
}

@UseGuards(JwtGuard, new RolesGuard('admin'))
@Post('enroll')
enroll(@Body() body:any) {
return this.service.enrollStudent(body.courseId, body.studentId);
}
}