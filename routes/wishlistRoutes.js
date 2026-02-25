const express = require("express");
const router = express.Router();
const wishlistControllers = require("../controllers/wishlistControllers");
const { protect } = require("../middlewares/auth");

router.get("/", protect, wishlistControllers.getWishlists);
router.post("/", protect, wishlistControllers.toggleToWishlist);

module.exports = router;