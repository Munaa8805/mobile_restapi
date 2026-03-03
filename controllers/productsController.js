const asyncHandler = require("../utils/asyncHandler");
const Product = require("../models/Product");
const User = require("../models/User");

const AllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    data: products,
  });
});

const SingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});








module.exports = { AllProducts, SingleProduct, };
