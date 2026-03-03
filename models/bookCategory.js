const mongoose = require("mongoose");

const bookCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 30,
        minlength: 3,
        enum: ["fiction", "non-fiction", "biography", "history", "science", "technology", "philosophy", "religion", "art", "music", "dance", "theater", "film", "tv", "comics", "graphic novels", "manga", "anime", "other", "comics", "graphic novels", "manga", "anime", "other"],
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
}, { timestamps: true });

module.exports = mongoose.model("BookCategory", bookCategorySchema);