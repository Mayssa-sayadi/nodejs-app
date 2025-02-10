const express = require('express')
const authmiddlewares = require("../middlewares/authmiddlewares");
const {
    createCategoryController, 
    getAllCategoryController,
    getCategoryByIdController,
    deleteCategoryController,
    updateCategoryController
} = require('../controllers/categoryController')
//router object
const router = express.Router();

//routes GET /POST/UPDATE/DELETE

router.post("/createCategory", authmiddlewares, createCategoryController);
router.get('/getAllCategory',authmiddlewares,getAllCategoryController)
router.get("/getCategoryById/:id",authmiddlewares,getCategoryByIdController);
router.delete("/deleteCategory/:id", authmiddlewares,deleteCategoryController);
router.put("/updateCategory/:id",authmiddlewares,updateCategoryController)

module.exports = router;

