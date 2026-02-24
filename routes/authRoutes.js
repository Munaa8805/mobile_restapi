const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const { protect } = require("../middlewares/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/user", protect, authController.getUser);

module.exports = router;
