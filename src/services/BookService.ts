import { Service } from 'typedi';

import { BookModel } from '../models/BookModel';

@Service()
export class BookService {
  public getAllBooks() {
    return BookModel
      .find({}, null, { lean: false })
      .then(data => data.map(elem => elem.toObject()));
  }

  public deleteBook(id: string) {
    return BookModel.deleteOne({ _id: id })
  }

  public getBookById(id: string) {
    return BookModel.findById(id, null, { lean: true })
  }

}
