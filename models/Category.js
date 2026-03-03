const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 30,
            minlength: 3
        },
        slug: {
            type: String,
            required: true,
            lowercase: true
        }
    },
    { _id: false }
);

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        icon: {
            type: String // optional (for React Native icon name)
        },
        image: {
            type: String // optional category image URL
        },
        subcategories: [subcategorySchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Category", categorySchema);