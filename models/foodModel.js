const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required"],
    },
    description: {
      type: String,
      required: [true, "Food description is required"],
    },
    price: {
      type: Number,
      required: [true, "Food price is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/good-food-logo-design_79169-10.jpg",
    },
    foodTags: {
      type: [String], 
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category",
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Restaurant",
    },
    rating: {
      type: Number,
      default: 1,
      min: [1, "Min rating is 1"],
      max: [5, "Max rating is 5"],
    },
    ratingCount: {
      type: Number, 
      default: 0, 
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
