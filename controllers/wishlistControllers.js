const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const Product = require("../models/Product");

const toggleToWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get the user's ID from the request object
  const productId = req.body.productId;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product is already in the wishlist
    const existingProductIndex = user.wishlist.findIndex(
      (item) => item == productId,
    );

    if (existingProductIndex !== -1) {
      // Remove the product from the wishlist
      user.wishlist.splice(existingProductIndex, 1); // Remove one element at the index
    } else {
      // Add the product to the wishlist
      const newProduct = await Product.findById(productId);

      if (!newProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      user.wishlist.push(newProduct._id); // Add the product ID to the wishlist
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({
      success: true,
      user: user,
    }); //Return the wishlist
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const clearWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    user.wishlist = []; // Clear the wishlist

    await user.save();

    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { toggleToWishlist, clearWishlist };
