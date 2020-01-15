import { Schema, model } from 'mongoose';
import { IBook } from '../types/interfaces/book';

const BookSchema: Schema = new Schema(
  {},
  {
    versionKey: false,
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      }
    },
    toJSON: {
      transform: function (doc, ret) {
        ret._id = ret._id.toString();
      }
    }
  }
);

export const BookModel = model<IBook>('books', BookSchema, 'books');
