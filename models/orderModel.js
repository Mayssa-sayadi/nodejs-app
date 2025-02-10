const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Food",
      },
    ],
    payment: {
      method: {
        type: String,
        enum: ["cash", "credit_card", "paypal"],
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
      },
      transactionId: {
        type: String,
      },
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["preparing", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);


const order = mongoose.model("Order", orderSchema);
module.exports = order;
