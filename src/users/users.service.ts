import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
constructor(@InjectModel('User') private userModel: Model<any>) {}

create(user:any){
return this.userModel.create(user);
}

findByEmail(email:string){
return this.userModel.findOne({email});
}

findAll(){
return this.userModel.find();
}
}
