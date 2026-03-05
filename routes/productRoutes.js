const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productsController");





router.get("/", productControllers.AllProducts);
router.get("/featured", productControllers.FeaturedProducts);
router.get("/:id", productControllers.SingleProduct);


module.exports = router;
