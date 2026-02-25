const asyncHandler = require("../utils/asyncHandler");
const Wishlist = require("../models/Wishlist");

const getWishlists = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.find({ userId: req.user._id });
  res.status(200).json({ success: true, data: wishlist });
});

const toggleToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is required" });
  }
  const wishlist = await Wishlist.findOne({ userId: req.user._id });
  if (!wishlist) {
    const newWishlist = await Wishlist.create({
      userId: req.user._id,
      products: [productId],
    });
    return res.status(201).json({ success: true, data: newWishlist });
  } else {
    if (wishlist.products.includes(productId)) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId.toString(),
      );
      await wishlist.save();
      return res.status(200).json({ success: true, data: wishlist });
    } else {
      wishlist.products.push(productId);
      await wishlist.save();
      return res.status(200).json({ success: true, data: wishlist });
    }
  }
});

module.exports = { getWishlists, toggleToWishlist };
