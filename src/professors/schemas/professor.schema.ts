import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Professor extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  professorId: string; // e.g., "PROF2024001"

  @Prop()
  department: string;

  @Prop()
  specialization: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  teachingCourses: Types.ObjectId[];
}

export const ProfessorSchema = SchemaFactory.createForClass(Professor);
