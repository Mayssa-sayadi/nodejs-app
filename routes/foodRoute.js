const express = require("express");
const authmiddlewares = require("../middlewares/authmiddlewares");
const adminMiddleware = require("../middlewares/adminmiddleware");
const {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  deleteFoodController,
  updateFoodController,
  placeOrderController,
  orderStatusController
} = require("../controllers/foodController");


//router object
const router = express.Router();

//routes GET /POST/UPDATE/DELETE

router.post('/createFood',authmiddlewares,createFoodController)
router.get("/getAllFood", authmiddlewares, getAllFoodController);
router.get("/getFoodById/:id", authmiddlewares, getFoodByIdController);
router.delete("/deleteFood/:id", authmiddlewares, deleteFoodController);
router.put("/updateFood/:id", authmiddlewares, updateFoodController);
router.post("/placeOrder", authmiddlewares, placeOrderController);
router.post('/orderStatus/:id',adminMiddleware,authmiddlewares,orderStatusController);
module.exports = router;
