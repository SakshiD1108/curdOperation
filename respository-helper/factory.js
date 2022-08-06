
import { mongodbCategoryQuery } from "./query/category-query";
import { mongodbProductQuery } from "./query/product-query";


export const factory = {
  getMongodbCategory: () => {
    return mongodbCategoryQuery;
  },

  getMongodbProduct: () => {
    return mongodbProductQuery;
  },

};
