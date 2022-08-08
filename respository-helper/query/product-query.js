import client from "../mongodb-user";
import mongo, { ObjectId } from "mongodb";
import { factory } from "../factory";
import dotenv from "dotenv"
dotenv.config();


const dbName = process.env.db_name;

export const mongodbProductQuery = {
  client,

  async addProductDetails(productName,description,categoryId) {
    try {
      const result = await client.db(dbName).collection("product").insertOne(
        {
            productName,description,categoryId
        },
        { $set: {} },
        { upsert: true, returnDocument: "after" }
      );
      return result.value;
    } catch (error) {
      throw error;
    }
  },

  async getAllProduct(page) {
    try {
      const ITEMS_PER_PAGE = 10;
      const result = await client
        .db(dbName)
        .collection("product")
        .aggregate([
          {
            $lookup: {
              "from": "category",
              "localField": "categoryId",
              "foreignField": "_id",
              "as": "Category"

            }
          }, {
            $unwind: "$Category"
          }
        ]).skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE).toArray()
      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateProduct(productId, productName, description) {
    try {
      const result = await client
        .db(dbName)
        .collection("product")
        .updateMany({ _id: new ObjectId(productId) }, { $set: { productName: productName, description: description } });
      return result;
    } catch (error) {
      throw error;
    }
  },

  async deleteId(productId ) {
    try {
      const result = await client
        .db(dbName)
        .collection("product")
        .deleteOne({ _id: new ObjectId(productId)});
      return result;
    } catch (error) {
      throw error;
    }
  },
};
