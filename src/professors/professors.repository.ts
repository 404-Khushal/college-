import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Professor } from './schemas/professor.schema';
import { CreateProfessorDto } from './dto/create-professor.dto';

@Injectable()
export class ProfessorsRepository {
  constructor(
    @InjectModel(Professor.name) private professorModel: Model<Professor>,
  ) {}

  async create(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    const professor = new this.professorModel(createProfessorDto);
    return professor.save();
  }

  async findByUserId(userId: string): Promise<Professor | null> {
    return this.professorModel
      .findOne({ userId })
      .populate('teachingCourses')
      .exec();
  }

  async findAll(): Promise<Professor[]> {
    return this.professorModel.find().populate('userId', 'name email').exec();
  }

  async assignCourse(professorId: string, courseId: string): Promise<Professor | null> {
    return this.professorModel.findByIdAndUpdate(
        professorId,
        { $addToSet: { teachingCourses: courseId } },
        { new: true },
      )
      .exec();
  }
}
