import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';
import { ProfessorsRepository } from './professors.repository';
import { Professor, ProfessorSchema } from './schemas/professor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Professor.name, schema: ProfessorSchema },
    ]),
  ],
  controllers: [ProfessorsController],
  providers: [ProfessorsService, ProfessorsRepository],
  exports: [ProfessorsService],
})
export class ProfessorsModule {}
