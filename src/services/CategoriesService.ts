import { CategoriesModel } from '../models/CategoriesModel';

export class CategoriesService {
  public async getCategories(params) {
    const { page, count } = params;

    return CategoriesModel
      .find({}, null, { lean: false })
      .skip(page > 0 ? (page * count) : 0)
      .limit(Number(count))
      .then(data => data.map(elem => elem.toObject()));
  }

  public getTotalCount(): Promise<number> {
    return CategoriesModel
      .count({})
      .then(value => Number(value));
  }

  public async addCategory(category) {
    return new Promise((resolve, reject) => {
      const categoriesModel = new CategoriesModel(category);
      categoriesModel.save((err, product) => {
        if (err) {
          reject(err);
        }
        resolve(product);
      });
    });
  }

  public async deleteCategory(id: string) {
    return new Promise((resolve, reject) => {
      CategoriesModel.findByIdAndRemove(id, (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }
}