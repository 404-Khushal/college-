import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  // POST /courses - Create course (Admin and Professor only)
  @Post()
  @Roles(Role.ADMIN, Role.PROFESSOR)
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  // GET /courses - Get all courses (Everyone can view)
  @Get()
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.STUDENT)
  async findAll() {
    return this.coursesService.findAll();
  }

  // GET /courses/:id - Get single course
  @Get(':id')
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.STUDENT)
  async findOne(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  // POST /courses/:id/enroll/:studentId - Enroll student in course
  @Post(':id/enroll/:studentId')
  @Roles(Role.ADMIN, Role.STUDENT)
  async enrollStudent(
    @Param('id') courseId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.coursesService.enrollStudent(courseId, studentId);
  }

  // PUT /courses/:id - Update course
  @Put(':id')
  @Roles(Role.ADMIN, Role.PROFESSOR)
  async update(@Param('id') id: string, @Body() updateData: any) {
    return this.coursesService.update(id, updateData);
  }

  // DELETE /courses/:id - Delete course
  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    return this.coursesService.delete(id);
  }
}
