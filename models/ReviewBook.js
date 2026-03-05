const mongoose = require("mongoose");

const reviewBookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 5,
        default: 1
    },
    comment: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 250
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model("ReviewBook", reviewBookSchema);