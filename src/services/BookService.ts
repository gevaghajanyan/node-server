import { Service } from 'typedi';
import { DocumentQuery } from 'mongoose';

import { BookModel } from '../models/BookModel';
import { IBook } from '../types/interfaces/book';

@Service()
export class BookService {
  public getAllBooks(): DocumentQuery<IBook[], IBook> & {} {
    return BookModel.find({}, null, { lean: true });
  }

  public deleteBook(id: string) {
    return BookModel.deleteOne({ _id: id })
  }

  public getBookById(id: string) {
    return BookModel.findById(id, null, { lean: true })
  }

}
