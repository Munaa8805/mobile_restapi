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
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
});
const cancelOrder = asyncHandler(async (req, res) => {
    try {
        const { status } = req.body;
        const userExists = await User.findById(req.user._id);
        if (!userExists) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.status === "cancelled") {
            return res.status(400).json({ success: false, message: "Order already cancelled" });
        }
        if (order.userId !== req.user._id) {
            return res.status(403).json({ success: false, message: "You are not authorized to cancel this order" });
        }
        if (status === "cancelled") {
            order.status = "cancelled";
            await order.save();
            return res.status(200).json({ success: true, data: order });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }



});

module.exports = { createOrder, getOrders, getOrderById, cancelOrder };