import express from "express";
import { factory } from "../respository-helper/factory";

export const router = express.Router();
export default router;



router.post("/", async (request, response) => {
  try {

    const categoryName = request.body.categoryName;
    const type = request.body.type;

    const addCategory = await factory
      .getMongodbCategory()
      .addCategoryDetails(categoryName , type);
    
    if (addCategory) {
      response.status(400).json({
        status: "FAILED",
        message: "Category not added successfully.",
      });
      return;
    } else {
      response.status(200).json({
        status: "ok",
        message: "Category add  successfully.",
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

    const getAll = await factory.getMongodbCategory().getAllCategory();
    console.log(getAll)

    if (getAll) {
        response.status(200).json({
            status: "SUCCESS",
            message: "Category fetched successfully",
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
    const categoryId = request.body.categoryId;
    const categoryName = request.body.categoryName;

   
      let updateCategory =  factory 
      .getMongodbCategory()
      .updateId(categoryId,categoryName );
      
      if (updateCategory) {
        response.status(200).json({
          status: "ok",
          message: "category update successfully.",
        });
        return;
      } else {
        response.status(400).json({
          status: "FAILED",
          message: "category not update successfully.",
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
      const categoryId = request.body.categoryId;

        let Category =  factory 
        .getMongodbCategory()
        .deleteId(categoryId);
        
        if (Category) {
          response.status(200).json({
            status: "ok",
            message: "category delete successfully.",
          });
          return;
        } else {
          response.status(400).json({
            status: "FAILED",
            message: "category not deleted.",
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
  


