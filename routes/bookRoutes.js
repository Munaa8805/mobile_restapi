const express = require("express");
const router = express.Router();
const bookControllers = require("../controllers/bookControllers");

router.post("/", bookControllers.createBook);
router.get("/", bookControllers.getBooks);
router.get("/:id", bookControllers.getBookById);

module.exports = router;