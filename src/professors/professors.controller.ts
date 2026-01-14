import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('professors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfessorsController {
  constructor(private professorsService: ProfessorsService) {}

  // POST /professors - Create new professor (Admin only)
  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorsService.create(createProfessorDto);
  }

  // GET /professors - Get all professors (Admin only)
  @Get()
  @Roles(Role.ADMIN)
  async findAll() {
    return this.professorsService.findAll();
  }

  // GET /professors/me - Get current professor's profile
  @Get('me')
  @Roles(Role.PROFESSOR)
  async getMyProfile(@CurrentUser() user: any) {
    return this.professorsService.findByUserId(user.id);
  }

  // POST /professors/:id/assign/:courseId - Assign course to professor
  @Post(':id/assign/:courseId')
  @Roles(Role.ADMIN)
  async assignCourse(
    @Param('id') professorId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.professorsService.assignCourse(professorId, courseId);
  }
}
