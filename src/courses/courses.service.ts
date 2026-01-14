import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private coursesRepository: CoursesRepository) {}

  async create(createCourseDto: CreateCourseDto) {
    return this.coursesRepository.create(createCourseDto);
  }

  async findAll() {
    return this.coursesRepository.findAll();
  }

  async findById(id: string) {
    const course = await this.coursesRepository.findById(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async findByProfessor(professorId: string) {
    return this.coursesRepository.findByProfessor(professorId);
  }

  async enrollStudent(courseId: string, studentId: string) {
    const course = await this.findById(courseId);

    // Check if course is full
    if (course.enrolledStudents.length >= course.maxStudents) {
      throw new BadRequestException('Course is full');
    }

    // Check if student already enrolled
    if (course.enrolledStudents.includes(studentId as any)) {
      throw new BadRequestException('Student already enrolled in this course');
    }

    return this.coursesRepository.addStudent(courseId, studentId);
  }

  async update(id: string, updateData: any) {
    return this.coursesRepository.update(id, updateData);
  }

  async delete(id: string) {
    return this.coursesRepository.delete(id);
  }
}
