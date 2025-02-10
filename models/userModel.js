const mongoose = require('mongoose')
//schema
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user Name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password id required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    userType: {
      type: String,
      required: [true, "user Type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTuzV2RgxmTJz27y0UCftD47PnWBKjP12sPA&s",
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  { timestamps: true }
);

//model
const User = mongoose.model('User',userSchema);
module.exports = User;