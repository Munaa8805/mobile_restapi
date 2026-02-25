const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * Registers a new user.
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });
  sendTokenResponse(newUser, 201, req, res);
});

/**
 * Logs in a user.
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  }
  sendTokenResponse(user, 200, req, res);
});

/**
 * Logs out the current user.
 */
const logout = asyncHandler(async (req, res) => {
  res
    .cookie("twitter_token", "", {
      expires: new Date(Date.now() - 1000),
      httpOnly: process.env.NODE_ENV === "production",
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
      sameSite: "strict",
    })
    .json({ success: true, message: "Logged out successfully" });
});

/**
 * Returns the current authenticated user.
 */
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  sendTokenResponse(user, 200, req, res);
});

const signToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const sendTokenResponse = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie("bazaar_token", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: process.env.NODE_ENV === "production",
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    sameSite: "strict",
  });
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      displayName: user.displayName,
      wishList: user.wishList,
    },
  });
};

module.exports = { register, login, logout, getUser };
