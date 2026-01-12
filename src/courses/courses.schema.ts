import { Schema } from 'mongoose';

export const CourseSchema = new Schema({
name:String,
professorId:String,
students:[String]
});