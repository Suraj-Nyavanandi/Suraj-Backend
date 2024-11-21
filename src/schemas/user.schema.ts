import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Mongoose schema for the User document
@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })  // Email is required and must be unique
    email: string;

    @Prop({ required: true })  // Password is required
    password: string;
}

// Generate the Mongoose schema for the User class
export const UserSchema = SchemaFactory.createForClass(User);
