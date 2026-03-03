const express = require("express");
const router = express.Router();
const bookCategoryControllers = require("../controllers/bookCategoryController");

router.post("/", bookCategoryControllers.createBookCategory);
router.get("/", bookCategoryControllers.getBookCategories);
router.get("/:id", bookCategoryControllers.getBookCategoryById);
module.exports = router;