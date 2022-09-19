const mongoose = require("mongoose");

const tourScheema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: [true, "this  name is already exist give a new name"],
    },
    destinations: {
      type: String,
      required: [true, "A tour must have a destinition"],
    },
    rating: {
      type: Number,
      default: 0,
      set: (value) => Math.round(value * 10) / 10,
    },

    duration: {
      type: Number,
      min: [1, "duration must be above 1"],
      required: [true, "A tour must have a duration"],
      validate: {
        validator: (number) => number.isInteger && number > 0,
        message: "Duration must be a Natural Number",
      },
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
      validate: (number) => number.isInteger && number > 0,
      message: "price must be greater then 0",
    },
    image: {
      type: String,
      required: [true, "A tour must have a image cover"],
    },
    startDate: {
      type: String,
    },
    hitPoint: {type: Number, default: 0},
  },
  {
    timestamps: true,
  }
);

const TourModel = mongoose.model("tour", tourScheema);
module.exports = TourModel;
