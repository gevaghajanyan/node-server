import { Schema, model } from 'mongoose';
import { IBook } from '../types/interfaces/book';

const BookSchema: Schema = new Schema(
  {
    _id: String,
  },
  {
    versionKey: false,
  }
);

export const BookModel = model<IBook>('books', BookSchema, 'books');
