const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");
const { protect } = require("../middlewares/auth");

router.post("/", protect, orderControllers.createOrder);
router.get("/", protect, orderControllers.getOrders);
router.get("/:id", protect, orderControllers.getOrderById);
router.put("/:id", protect, orderControllers.cancelOrder);
module.exports = router;