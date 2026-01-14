import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsRepository {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = new this.studentModel(createStudentDto);
    return student.save();
  }

  async findByUserId(userId: string): Promise<Student | null> {
    return this.studentModel.findOne({ userId }).populate('enrolledCourses').exec();
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().populate('userId', 'name email').exec();
  }

  async enrollInCourse(studentId: string, courseId: string): Promise<Student> {
    return this.studentModel
      .findByIdAndUpdate(
        studentId,
        { $addToSet: { enrolledCourses: courseId } }, // $addToSet prevents duplicates
        { new: true },
      )
      .exec();
  }
}
