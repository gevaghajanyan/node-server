import { Schema, model } from 'mongoose';

const UserSchema: Schema = new Schema(
  {
    userName: String,
    password: String,
  }
);

export const UserModel = model('users', UserSchema, 'users');