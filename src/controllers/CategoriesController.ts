import {
  Get,
  JsonController,
  Post,
  QueryParams,
  Body,
  Delete,
  Param,
} from 'routing-controllers';
import { Inject } from 'typedi';

import { CategoriesService } from '../services/CategoriesService';
import { SuccessHttpResponse } from '../core/classes/HttpSuccess';

@JsonController('/categories')
export class CategoriesController {

  @Inject()
  private readonly categoriesService: CategoriesService;

  @Get('/')
  public async getCategories(
    @QueryParams() params: any,
  ) {
    const categories = await this.categoriesService.getCategories(params);
    const totalCount = await this.categoriesService.getTotalCount();
    return new SuccessHttpResponse({
      data: categories,
      totalCount,
    });
  }

  @Post('/')
  public async addCategory(
    @Body() category: any,
  ) {
    const data = this.categoriesService.addCategory(category);
    return new SuccessHttpResponse(data);
  }

  @Delete('/:id')
  public async deleteCategory(
    @Param('id') id: string
  ) {
    return this.categoriesService.deleteCategory(id);
  }
}