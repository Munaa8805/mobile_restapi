const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        minlength: 3,
    },
    author: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        minlength: 3,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
        minlength: 10,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 10,
        minlength: 1,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ["fiction", "non-fiction", "biography", "history", "science", "technology", "philosophy", "religion", "art", "music", "dance", "theater", "film", "tv", "comics", "graphic novels", "manga", "anime", "other"],
    },
    publishedDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    isbn: {
        type: String,
        required: true,
        trim: true,
        maxlength: 13,
        minlength: 10,
    },
    pages: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 10,
        minlength: 1,
    },
    featured: {
        type: Boolean,
        required: true,
        default: false
    },
    language: {
        type: String,
        required: true,
        trim: true,
        enum: ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Russian", "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Bengali", "Telugu", "Marathi", "Kannada", "Tamil", "Urdu", "Other"],
    },
    publisher: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        minlength: 3,
    },
    stock: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 10,
        minlength: 1,
        default: 0,
    },
    rating: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 5,
        minlength: 1,
        default: 1
    },
    reviews: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 100,
        minlength: 10,
    }
}, { timestamps: true });

/**
 * Computes average rating and review count for a book from ReviewBook collection.
 * @param {string|mongoose.Types.ObjectId} bookId - Book _id
 * @returns {Promise<{ averageRating: number, reviewCount: number }>}
 */
bookSchema.statics.getAverageRatingFromReviews = async function (bookId) {
    const ReviewBook = mongoose.model("ReviewBook");
    const result = await ReviewBook.aggregate([
        { $match: { book: new mongoose.Types.ObjectId(bookId) } },
        { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);
    if (!result.length) {
        return { averageRating: 0, reviewCount: 0 };
    }
    const averageRating = Math.round(result[0].avg * 10) / 10;
    return { averageRating, reviewCount: result[0].count };
};

module.exports = mongoose.model("Book", bookSchema);