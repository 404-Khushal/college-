import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../common/enums/role.enum';

@Schema({ timestamps: true }) 
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, select: false }) // Don't return password 
  password: string;

  @Prop({ required: true, enum: Object.values(Role) })
  role: Role;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Create index for faster email lookups
UserSchema.index({ email: 1 });
