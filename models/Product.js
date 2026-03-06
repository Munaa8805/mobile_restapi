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

// Index frequently queried fields for performance.
productSchema.index({ featured: 1 });
productSchema.index({ category: 1 });
productSchema.index({ name: 1 });

/**
 * Computes average rating and review count for a product from ReviewProduct collection.
 * @param {string|mongoose.Types.ObjectId} productId - Product _id
 * @returns {Promise<{ averageRating: number, reviewCount: number }>}
 */
productSchema.statics.getAverageRatingFromReviews = async function (productId) {
  const ReviewProduct = mongoose.model("ReviewProduct");
  const result = await ReviewProduct.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);
  if (!result.length) {
    return { averageRating: 0, reviewCount: 0 };
  }
  const averageRating = Math.round(result[0].avg * 10) / 10;
  return { averageRating, reviewCount: result[0].count };
};

module.exports = mongoose.model("Product", productSchema);
