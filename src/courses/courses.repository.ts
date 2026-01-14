import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = new this.courseModel(createCourseDto);
    return course.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel
      .find()
      .populate('professor', 'professorId department')
      .exec();
  }

  async findById(id: string): Promise<Course | null> {
    return this.courseModel
      .findById(id)
      .populate('professor')
      .populate('enrolledStudents')
      .exec();
  }

  async findByProfessor(professorId: string): Promise<Course[]> {
    return this.courseModel.find({ professor: professorId }).exec();
  }

  async addStudent(courseId: string, studentId: string): Promise<Course> {
    return this.courseModel
      .findByIdAndUpdate(
        courseId,
        { $addToSet: { enrolledStudents: studentId } },
        { new: true },
      )
      .exec();
  }

  async update(id: string, updateData: any): Promise<Course> {
    return this.courseModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Course> {
    return this.courseModel.findByIdAndDelete(id).exec();
  }
}
