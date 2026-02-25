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

const toggleToWishList = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  if (user.wishList.includes(product._id)) {
    user.wishList = user.wishList.filter(id => id.toString() !== product._id.toString());
    await user.save();
    return res.status(200).json({ success: true, data: user });
  } else {
    user.wishList.push(product._id);
    await user.save();
    return res.status(200).json({ success: true, data: user });
  }
})




module.exports = { AllProducts, SingleProduct, toggleToWishList };
