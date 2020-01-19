import { Schema, model } from 'mongoose';

const UserSchema: Schema = new Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    role: String,
  }
);

export const UserModel = model('users', UserSchema, 'users');