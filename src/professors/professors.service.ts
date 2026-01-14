import { Injectable } from '@nestjs/common';
import { ProfessorsRepository } from './professors.repository';
import { CreateProfessorDto } from './dto/create-professor.dto';

@Injectable()
export class ProfessorsService {
  constructor(private professorsRepository: ProfessorsRepository) {}

  async create(createProfessorDto: CreateProfessorDto) {
    return this.professorsRepository.create(createProfessorDto);
  }

  async findAll() {
    return this.professorsRepository.findAll();
  }

  async findByUserId(userId: string) {
    return this.professorsRepository.findByUserId(userId);
  }

  async assignCourse(professorId: string, courseId: string) {
    return this.professorsRepository.assignCourse(professorId, courseId);
  }
}
