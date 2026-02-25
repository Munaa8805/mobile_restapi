const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productsController");
const { protect } = require("../middlewares/auth");



router.post("/:id/wishlist", protect, productControllers.toggleToWishList);
router.get("/", productControllers.AllProducts);
router.get("/:id", productControllers.SingleProduct);


module.exports = router;
