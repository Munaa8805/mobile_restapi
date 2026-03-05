const asyncHandler = require("../utils/asyncHandler");
const Book = require("../models/Book");
const ReviewBook = require("../models/ReviewBook");

const createBook = asyncHandler(async (req, res) => {
    const {
        title,
        author,
        description,
        price,
        image,
        category,
        publishedDate,
        isbn,
        pages,
        language,
        publisher,
        stock,
        reviews,
    } = req.body;
    if (
        !title ||
        !author ||
        !description ||
        !price ||
        !image ||
        !category ||
        !publishedDate ||
        !isbn ||
        !pages ||
        !language ||
        !publisher ||
        !stock ||
        !reviews
    ) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
    }
    const book = await Book.create({
        title,
        author,
        description,
        price,
        image,
        category,
        publishedDate,
        isbn,
        pages,
        language,
        publisher: publisher || "Self-Published",
        stock: stock || 0,
        reviews: reviews || 0,
    });
    res.status(201).json({ success: true, data: book });
});

const getBooks = asyncHandler(async (req, res) => {
    let page = 1;
    let limit = 5;
    page = parseInt(req.query.page ? req.query.page : page);
    limit = parseInt(req.query.limit ? req.query.limit : limit);
    const books = await Book.find()
        .skip((page - 1) * limit)
        .limit(limit);
    if (!books) {
        return res.status(404).json({ success: false, message: "No books found" });
    }
    const totalBooks = await Book.countDocuments();
    const totalPages = Math.max(1, Math.ceil(totalBooks / limit));
    const previousPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;

    res.status(200).json({
        success: true,
        count: totalBooks,
        page,
        limit,
        totalPages,
        previousPage,
        nextPage,
        data: books,
    });
});

/**
 * Fetches a single book by ID and populates its reviews (from ReviewBook model).
 * Average rating and review count are calculated from ReviewBook; reviews include user ref populated.
 */
const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(404).json({ success: false, message: "Book not found" });
    }
    const [reviews, { averageRating, reviewCount }] = await Promise.all([
        ReviewBook.find({ book: req.params.id })
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .lean(),
        Book.getAverageRatingFromReviews(req.params.id),
    ]);
    const bookWithReviews = {
        ...book.toObject(),
        reviews,
        averageRating,
        reviewCount,
    };
    res.status(200).json({ success: true, data: bookWithReviews });
});

const featureBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({ featured: true });

    res.status(201).json({
        success: true,
        count: books.length,
        data: books,
    });
});

module.exports = { createBook, getBooks, getBookById, featureBooks };
