const express = require("express");
const router = express.Router();
const wishlistControllers = require("../controllers/wishlistControllers");
const { protect } = require("../middlewares/auth");

// Add product
router.post("/", protect, wishlistControllers.toggleToWishlist);

// Clear wishlist
router.delete("/reset", protect, wishlistControllers.clearWishlist);

module.exports = router;
