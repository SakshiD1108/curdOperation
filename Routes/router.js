import express from "express";
import category from "./category";
import product from "./product"


export const userRouter = express.Router();
userRouter.use("/category", category);
userRouter.use("/product", product);


