import client from "../mongodb-user";
import mongo, { ObjectId } from "mongodb";
import { factory } from "../factory";
import dotenv from "dotenv"
dotenv.config();


const dbName = process.env.db_name;

export const mongodbCategoryQuery = {
  client,

  async addCategoryDetails(categoryName , type) {
    try {
      const result = await client.db(dbName).collection("category").insertOne(
        {
          categoryName, type
        },
        { $set: {} },
        { upsert: true, returnDocument: "after" }
      );
      return result.value;
    } catch (error) {
      throw error;
    }
  },

  async getAllCategory() {
    try {
     
      const result = await client
        .db(dbName)
        .collection("category")
        .find().toArray()
      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateId(categoryId , categoryName) {
    try {
      const result = await client
        .db(dbName)
        .collection("category")
        .updateMany({ _id: new ObjectId(categoryId) },{ $set:{categoryName:categoryName } });
      return result;
    } catch (error) {
      throw error;
    }
  },

  async deleteId(categoryId ) {
    try {
      const result = await client
        .db(dbName)
        .collection("category")
        .deleteOne({ _id: new ObjectId(categoryId)});
      return result;
    } catch (error) {
      throw error;
    }
  },
};
