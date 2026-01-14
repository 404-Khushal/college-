import { IsString, IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  courseCode: string;

  @IsString()
  courseName: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  credits: number;

  @IsMongoId()
  @IsOptional()
  professor?: string;

  @IsNumber()
  @IsOptional()
  maxStudents?: number;
}
