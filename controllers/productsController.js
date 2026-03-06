const asyncHandler = require("../utils/asyncHandler");
const Product = require("../models/Product");
const User = require("../models/User");
const ReviewProduct = require("../models/reviewProduct");

/**
 * Fetches all products with ReviewProduct-derived averageRating and reviewCount per product.
 */
const AllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().lean();
  if (!products || products.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No products found",
    });
  }
  const productIds = products.map((p) => p._id);
  const reviewStats = await ReviewProduct.aggregate([
    { $match: { product: { $in: productIds } } },
    { $group: { _id: "$product", averageRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } },
  ]);
  const statsByProduct = Object.fromEntries(
    reviewStats.map((s) => [
      s._id.toString(),
      { averageRating: Math.round(s.averageRating * 10) / 10, reviewCount: s.reviewCount },
    ])
  );
  const data = products.map((product) => {
    const stats = statsByProduct[product._id.toString()] || { averageRating: 0, reviewCount: 0 };
    return { ...product, ...stats };
  });

  res.status(200).json({
    success: true,
    data,
  });
});

/**
 * Fetches a single product by ID with reviews (from ReviewProduct), averageRating, and reviewCount.
 */
const SingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  const [reviews, { averageRating, reviewCount }] = await Promise.all([
    ReviewProduct.find({ product: req.params.id })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean(),
    Product.getAverageRatingFromReviews(req.params.id),
  ]);
  const productWithReviews = {
    ...product.toObject(),
    reviews,
    averageRating,
    reviewCount,
  };
  res.status(200).json({
    success: true,
    data: productWithReviews,
  });
});

const FeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true });
  if (!products) {
    return res.status(404).json({
      success: false,
      message: "No featured products found",
    });
  }

  res.status(200).json({
    success: true,
    data: products,
  });
});








module.exports = { AllProducts, SingleProduct, FeaturedProducts };
