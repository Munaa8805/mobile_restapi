const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");

const updateUser = asyncHandler(async (req, res) => {
    const { name, email, displayName, bio, avatarUrl, bannerUrl, phone, address, city, state, country, postalCode, shippingAddress, billingAddress } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    user.name = name;
    user.email = email;
    user.displayName = displayName;
    user.bio = bio;
    user.avatarUrl = avatarUrl;
    user.bannerUrl = bannerUrl;
    user.phone = phone;
    user.address = address;
    user.city = city;
    user.state = state;
    user.country = country;
    user.postalCode = postalCode;
    user.shippingAddress = shippingAddress;
    user.billingAddress = billingAddress;
    await user.save();
    res.status(200).json({ success: true, data: user });
});

module.exports = { updateUser };