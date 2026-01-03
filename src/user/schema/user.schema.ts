/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { UserRole } from '../enum/user.enum';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;
@Schema({
    timestamps: true,

})
export class User extends Document {
    declare _id: Types.ObjectId;
    
    @Prop({ required: true, minLength: 3 })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, minLength: 6 })
    password: string;

    
}

export const UserSchema = SchemaFactory.createForClass(User);
