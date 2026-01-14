import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  studentId: string; // e.g., "STU2024001"

  @Prop()
  department: string;

  @Prop()
  year: number; // 1, 2, 3, 4

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  enrolledCourses: Types.ObjectId[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
