const asyncHandler = require("../utils/asyncHandler");
const BookCategory = require("../models/bookCategory");
const slugify = require("slugify");

const createBookCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const bookCategory = await BookCategory.create({ name, slug: slugify(name, { lower: true }) });
    res.status(201).json({ success: true, data: bookCategory });
});

const getBookCategories = asyncHandler(async (req, res) => {
    const bookCategories = await BookCategory.find();
    if (!bookCategories) {
        return res.status(404).json({ success: false, message: "No book categories found" });
    }
    res.status(200).json({ success: true, data: bookCategories });
});

const getBookCategoryById = asyncHandler(async (req, res) => {
    const bookCategory = await BookCategory.findById(req.params.id);
    if (!bookCategory) {
        return res.status(404).json({ success: false, message: "Book category not found" });
    }
    res.status(200).json({ success: true, data: bookCategory });
});

module.exports = { createBookCategory, getBookCategories, getBookCategoryById };