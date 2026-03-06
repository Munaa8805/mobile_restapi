const express = require("express");
const reviewProductControllers = require("../controllers/reviewProductController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/", protect, reviewProductControllers.createReview);
// router.get("/", reviewProductControllers.getReviews);
// router.get("/:productId", reviewProductControllers.getReviewsByProductId);

module.exports = router;