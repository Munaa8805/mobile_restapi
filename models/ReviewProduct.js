// const mongoose = require("mongoose");

// const reviewProductSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//         required: true,
//     },
//     rating: {
//         type: Number,
//         required: true,
//         minlength: 1,
//         maxlength: 5,
//         default: 1
//     },
//     comment: {
//         type: String,
//         required: true,
//         minlength: 2,
//         maxlength: 250
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// }, { timestamps: true });

// // Index frequently queried fields for performance.
// reviewProductSchema.index({ product: 1 });
// reviewProductSchema.index({ user: 1, product: 1 });

// module.exports = mongoose.model("ReviewProduct", reviewProductSchema);