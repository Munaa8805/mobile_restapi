const asyncHandler = require("../utils/asyncHandler");
const Review = require("../models/ReviewBook");
const Book = require("../models/Book");

const createReview = asyncHandler(async (req, res) => {
    const { bookId, rating, comment } = req.body;
    if (!bookId || !rating || !comment) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const book = await Book.findById(bookId);
    if (!book) {
        return res.status(404).json({ success: false, message: "Book not found" });
    }
    const review = await Review.create({ user: req.user._id, book: bookId, rating, comment });
    res.status(201).json({ success: true, data: review });
});


const getReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find();
    if (!reviews) {
        return res.status(404).json({ success: false, message: "No reviews found" });
    }
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
});

const getReviewsByBookId = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ book: req.params.bookId });
    if (!reviews) {
        return res.status(404).json({ success: false, message: "No reviews found" });
    }
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
});

module.exports = { createReview, getReviews, getReviewsByBookId };