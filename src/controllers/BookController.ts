import { Inject } from 'typedi';
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Authorized,
  JsonController, UseAfter,
} from 'routing-controllers';

import { ResponseSchema, } from 'routing-controllers-openapi';

import { BookService } from '../services/BookService';
import { SuccessHttpResponse } from '../core/classes/HttpSuccess';
import { BookResponse } from '../components/schemas/BookResponse';

@JsonController('/books')
export class BookController {
  @Inject()
  private readonly bookService: BookService;

  @Get('/')
  @ResponseSchema(BookResponse)
  public async getBooks(): Promise<SuccessHttpResponse<BookResponse[]>> {
    try {
      const books: BookResponse[] = await this.bookService.getAllBooks();
      return new SuccessHttpResponse(books)
    } catch ( error ) {
      throw new Error(error)
    }
  }

  @Get('/:id')
  public async getBookById(
    @Param('id') id: string,
  ) {
    try {
      const book = await this.bookService.getBookById(id);
      return new SuccessHttpResponse(book)
    } catch ( error ) {
      throw new Error(error)
    }
  }

  @Post('/')
  @Authorized()
  public addBook(
    @Body() book: any
  ) {
    return 'Saving user...';
  }

  @Put('/')
  @Authorized()
  public editBook(
    @Body() user: any
  ) {
    return 'Updating a user...';
  }

  @Delete('/:id')
  @Authorized()
  public async deleteBook(@Param('id') id: string): Promise<SuccessHttpResponse<null>> {
    try {
      await this.bookService.deleteBook(id);
      return new SuccessHttpResponse(null)
    } catch ( error ) {
      throw new Error(error)
    }
  }
}

