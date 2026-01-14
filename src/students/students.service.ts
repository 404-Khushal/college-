import { Injectable } from '@nestjs/common';
import { StudentsRepository } from './students.repository';
import { CreateStudentDto } from './dto/student-create.dto';

@Injectable()
export class StudentsService {
  constructor(private studentsRepository: StudentsRepository) {}

  async create(createStudentDto: CreateStudentDto) {
    return this.studentsRepository.create(createStudentDto);
  }

  async findAll() {
    return this.studentsRepository.findAll();
  }

  async findByUserId(userId: string) {
    return this.studentsRepository.findByUserId(userId);
  }

  async enrollInCourse(studentId: string, courseId: string) {
    return this.studentsRepository.enrollInCourse(studentId, courseId);
  }
}
