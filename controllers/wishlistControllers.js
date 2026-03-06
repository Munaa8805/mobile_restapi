const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const Product = require("../models/Product");

/**
 * Toggles a product in the authenticated user's wishlist.
 * If the product exists in wishlist it is removed, otherwise it is added.
 */
const toggleToWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  if (!productId) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is required" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User not found" });
  }

  const existingProductIndex = user.wishlist.findIndex(
    (item) => item.toString() === productId.toString(),
  );

  if (existingProductIndex !== -1) {
    user.wishlist.splice(existingProductIndex, 1);
  } else {
    const newProduct = await Product.findById(productId);
    if (!newProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    user.wishlist.push(newProduct._id);
  }

  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Clears all items from the authenticated user's wishlist.
 */
const clearWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User not found" });
  }

  user.wishlist = [];
  await user.save();

  res.status(200).json({ success: true, data: user });
});

module.exports = { toggleToWishlist, clearWishlist };
