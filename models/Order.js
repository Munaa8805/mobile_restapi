const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    currency: {
        type: String,
        required: true,
        enum: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "BDT"],
        default: "USD"
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["credit_card", "debit_card", "paypal", "bank_transfer", "cash_on_delivery"],
        default: "credit_card"
    },
    items: {
        type: String,
        required: true,
    },
    summary: {
        type: Object,
        required: true,
        subtotal: {
            type: Number,
            required: true
        },
        shipping: {
            type: Number,
            required: true
        },
        tax: {
            type: Number,
            required: true
        },
        grandTotal: {
            type: Number,
            required: true
        }
    },
    shippingAddress: {
        type: Object,
        required: true,
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);