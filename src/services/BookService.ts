import { Service } from 'typedi';

import { BookModel } from '../models/BookModel';

@Service()
export class BookService {
  public getAllBooks(params) {
    const { page, count } = params;
    console.log(count, 'count');
    return BookModel
      .find({}, null, { lean: false })
      .skip(page > 0 ? (page * count) : 0)
      .limit(Number(count))
      .then(data => data.map(elem => elem.toObject()));
  }

  public getTotalCount(): Promise<number> {
    return BookModel.count({}).then(value => Number(value));
  }

  public deleteBook(id: string) {
    return BookModel.deleteOne({ _id: id })
  }

  public getBookById(id: string) {
    return BookModel.findById(id, null, { lean: true })
      .then(book => {
        book.id = book._id.toString();
        delete book._id;
        return book
      })
  }

}
