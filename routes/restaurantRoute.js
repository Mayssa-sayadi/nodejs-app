const express = require("express");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");
const authmiddlewares = require("../middlewares/authmiddlewares");

//router object
const router = express.Router();

//routes GET /POST/UPDATE/DELETE

router.post('/createRestaurant',authmiddlewares,createRestaurantController)
router.get('/getAllRestaurant',authmiddlewares,getAllRestaurantController)
router.get(
  "/getRestaurantById/:id",
  authmiddlewares,
  getRestaurantByIdController
);
router.delete("/deleteRestaurant/:id", authmiddlewares,deleteRestaurantController);
module.exports = router;
