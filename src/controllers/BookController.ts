import { serve } from 'swagger-ui-express';
import { HttpSuccess } from './../core/classes/HttpSuccess';
import { Inject } from 'typedi';

import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
  HttpCode,
} from 'routing-controllers';

import { BookService } from '../services/BookService';

@Controller('/books')
export class BookController {
  @Inject()
  private readonly bookService: BookService;

  @Get('/')
  @HttpCode(200)
  public async getBooks(@Req() request: any, @Res() response: any) {
    try {
      const books = await this.bookService.getAllBooks();
      console.log(books, 'books');
      return response.send(new HttpSuccess('bookssd'))
    } catch {
      throw new Error('error')
    }
  }

  @Get('/:id')
  public getBookById(
    @Param('id') id: number
  ) {
    return 'This action returns book #' + id;
  }

  @Post('/')
  public addBook(
    @Body() book: any
  ) {
    return 'Saving user...';
  }

  @Put('/:id')
  public editBook(
    @Param('id') id: number,
    @Body() user: any
  ) {
    return 'Updating a user...';
  }

  @Delete('/:id')
  public deleteBook(
    @Param('id') id: number
  ) {
    return 'Removing user...';
  }

}

