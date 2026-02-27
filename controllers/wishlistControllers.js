const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");

const addToWishlist = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { wishlist: productId } }, // prevents duplicates
            { new: true }
        ).populate("wishlist");

        res.status(200).json({ success: true, data: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
const getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate("wishlist");

        res.status(200).json({
            success: true,
            data: user.wishlist
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { wishlist: productId } },
            { new: true }
        ).populate("wishlist");

        res.status(200).json({
            success: true,
            data: user.wishlist
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const clearWishlist = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { wishlist: [] } },
            { new: true }
        );

        res.status(200).json({ message: "Wishlist cleared", data: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { addToWishlist, getWishlist, clearWishlist, removeFromWishlist };
