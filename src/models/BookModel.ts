import { Schema, model } from 'mongoose';

const BookSchema: Schema = new Schema({}, {versionKey: false});

const BookModel = model('books', BookSchema, 'books');

export {
  BookModel,
}