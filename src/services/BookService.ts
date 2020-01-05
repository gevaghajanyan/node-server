import { Service } from 'typedi';

import { BookModel } from '../models/BookModel';

@Service()
class BookService {
  getAllBooks() {
    const query = BookModel.find({}, null, {lean: true}).then((value)=> {
      console.log(value, 'value')
    }).catch(err=> {
      console.log(err, 'fooo')
    })
    
    return query;
  }
}

export {
  BookService,
}
