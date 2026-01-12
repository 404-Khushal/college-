import { Injectable } from '@nestjs/common';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class DashboardService {
constructor(private courses: CoursesService) {}

student(studentId: string) {
return this.courses.findByStudent(studentId);
}

professor(professorId: string) {
return this.courses.findByProfessor(professorId);
}

admin() {
return this.courses.findAll();
}
}