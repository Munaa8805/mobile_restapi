const asyncHandler = require("../utils/asyncHandler");
const Order = require("../models/Order");
const User = require("../models/User");

const createOrder = asyncHandler(async (req, res) => {
    const { items, summary, shippingAddress } = req.body;
    if (!items || !summary || !shippingAddress) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    // console.log("req.user", req.user);
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    const order = await Order.create({ userId: req.user._id, items: JSON.stringify(items), summary, shippingAddress });
    res.status(201).json({ success: true, data: order });
});

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ userId: req.user._id });
    res.status(200).json({ success: true, data: orders });
});

module.exports = { createOrder, getOrders };