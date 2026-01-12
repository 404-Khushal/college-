import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
constructor(@InjectModel('Course') private model:Model<any>){}

create(course:any){
return this.model.create(course);
}

findAll(){
return this.model.find();
}

findByStudent(id: string) {
    return this.model.find({ students: id });
    }
    
findByProfessor(id: string) {
    return this.model.find({ professorId: id });
    }

assignProfessor(courseId: string, professorId: string) {
        return this.model.findByIdAndUpdate(
        courseId,
        { professorId },
        { new: true }
        );
        }

enrollStudent(courseId: string, studentId: string) {
            return this.model.findByIdAndUpdate(
            courseId,
            { $push: { students: studentId } },
            { new: true }
            );
            }
}

