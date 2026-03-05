const express = require("express");
const router = express.Router();
const reviewBookControllers = require("../controllers/reviewBookController");
const { protect } = require("../middlewares/auth");


router.post("/", protect, reviewBookControllers.createReview);
router.get("/", reviewBookControllers.getReviews);
router.get("/:bookId", reviewBookControllers.getReviewsByBookId);

module.exports = router;