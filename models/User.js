const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 100,
      trim: true,
      select: false,
    },
    profilePicture: { type: String, default: "" },
    displayName: { type: String, default: "" },
    bio: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    bannerUrl: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    tweetsCount: { type: Number, default: 0 },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });
userSchema.index({ name: 1 });

module.exports = mongoose.model("User", userSchema);
