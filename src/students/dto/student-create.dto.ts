import { IsString, IsNumber, IsMongoId } from 'class-validator';

export class CreateStudentDto {
  @IsMongoId()
  userId: string;

  @IsString()
  studentId: string;

  @IsString()
  department: string;

  @IsNumber()
  year: number;
}
