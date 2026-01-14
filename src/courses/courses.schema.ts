import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true })
  courseCode: string; // e.g., "CS101"

  @Prop({ required: true })
  courseName: string;

  @Prop()
  description: string;

  @Prop()
  credits: number;

  @Prop({ type: Types.ObjectId, ref: 'Professor' })
  professor: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Student' }] })
  enrolledStudents: Types.ObjectId[];

  @Prop({ default: 30 })
  maxStudents: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
