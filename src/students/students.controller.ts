import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/student-create.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard) // All routes need authentication
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  // POST /students - Create new student (Admin only)
  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  // GET /students - Get all students (Admin and Professor only)
  @Get()
  @Roles(Role.ADMIN, Role.PROFESSOR)
  async findAll() {
    return this.studentsService.findAll();
  }

 
  @Get('me')
  @Roles(Role.STUDENT)
  async getMyProfile(@CurrentUser() user: any) {
    return this.studentsService.findByUserId(user.id);
  }

 
  @Post(':id/enroll/:courseId')
  @Roles(Role.ADMIN, Role.STUDENT)
  async enrollInCourse(
    @Param('id') studentId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.studentsService.enrollInCourse(studentId, courseId);
  }
}