import { Schema, model } from 'mongoose';
import { IBook } from '../types/interfaces/book';

const CategoriesSchema: Schema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        ret._id = ret._id.toString();
      },
    },
  },
);

export const CategoriesModel = model<IBook>('category', CategoriesSchema, 'category');
