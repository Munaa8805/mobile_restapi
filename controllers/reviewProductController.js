const asyncHandler = require("../utils/asyncHandler");
const ReviewProduct = require("../models/reviewProduct");
const Product = require("../models/Product");

const createReview = asyncHandler(async (req, res) => {
    const { productId, rating, comment } = req.body;
    if (!productId || !rating || !comment) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    const review = await ReviewProduct.create({ user: req.user._id, product: productId, rating, comment });

    res.status(201).json({ success: true, data: review });

});


module.exports = { createReview };