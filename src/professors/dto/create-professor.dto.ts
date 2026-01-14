import { IsString, IsMongoId } from 'class-validator';

export class CreateProfessorDto {
  @IsMongoId()
  userId: string;

  @IsString()
  professorId: string;

  @IsString()
  department: string;

  @IsString()
  specialization: string;
}
