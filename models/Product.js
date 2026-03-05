const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
      minlength: 10,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 10,
      minlength: 1,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    featured: {
      type: Boolean,
      required: true,
      default: false
    },
    rating: {
      type: Number,
      required: true,
      trim: true,
    },
    reviews: {
      type: String,
      required: true,
      trim: true,
    },
    colors: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    sizes: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    quantity: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 10,
      minlength: 1,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
