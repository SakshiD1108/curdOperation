import express from "express";
import { factory } from "../respository-helper/factory";
import mongo, { ObjectId } from "mongodb";

export const router = express.Router();
export default router;



router.post("/", async (request, response) => {
  try {

    const productName = request.body.productName;
    const description = request.body.description;
    const categoryId = ObjectId(request.body.categoryId);

    const addProduct = await factory
      .getMongodbProduct()
      .addProductDetails(productName,description,categoryId);
    
    if (addProduct) {
      response.status(400).json({
        status: "FAILED",
        message: "product not added successfully.",
      });
      return;
    } else {
      response.status(200).json({
        status: "ok",
        message: "product add  successfully.",
      });
      return;
    }
  } catch (error) {
    response.status(500).json({
      status: "FAILED",
      message: error.message,
    });
    return;
  }
});


router.get("/", async (request, response) => {
  try {
    const page = request.query.page || 1
    const getAll = await factory.getMongodbProduct().getAllProduct(page);
    console.log(getAll)

    if (getAll) {
        response.status(200).json({
            status: "SUCCESS",
            message: "product fetched successfully",
            getAll
        });
        return;
    }
} catch (error) {
    response.status(500).json({
        status: "FAILED",
        message: error.message
    });
    return
}
});



router.put("/",async (request, response) => {
  try {
    const productId = request.body.productId;
    const productName = request.body.productName;
    const description = request.body.description

   
      let updateAll =  factory 
      .getMongodbProduct()
      .updateProduct(productId ,productName ,description);
      
      if (updateAll) {
        response.status(200).json({
          status: "ok",
          message: "Product update successfully.",
        });
        return;
      } else {
        response.status(400).json({
          status: "FAILED",
          message: "product not update successfully.",
        });
        return;
      }
      
  } catch (error) {
    response.status(500).json({
      status: "FAILED",
      message: error.message,
    });
    return;
  }
});

router.delete("/",async (request, response) => {
    try {
      const productId = request.body.productId;

        let Category =  factory 
        .getMongodbProduct()
        .deleteId(productId);
        
        if (Category) {
          response.status(200).json({
            status: "ok",
            message: "Product delete successfully.",
          });
          return;
        } else {
          response.status(400).json({
            status: "FAILED",
            message: "product not deleted.",
          });
          return;
        }
        
      
    } catch (error) {
      response.status(500).json({
        status: "FAILED",
        message: error.message,
      });
      return;
    }
  });
  


