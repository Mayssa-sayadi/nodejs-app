const mongoose = require('mongoose')
//schema
const restaurantSchema = mongoose.Schema(
  {
    restaurantName: {
      type: String,
      unique: true,
      required: [true, "restaurant Name is required"],
    },
    imageUrl: {
      type: String,
    },
    foods: {
      type: Array,
      required: [true, "foods is required"],
    },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: [1,'min rating is 1'],
      max: [5,'max rating is 5']
    },
    ratignCount: {
      type: String,
    },
    code: {
      type: String,
    },
    coords: {
      id: { type: String },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true }
);

//model
const Restaurant = mongoose.model('Restaurant',restaurantSchema);
module.exports = Restaurant;