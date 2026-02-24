const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Multer disk storage for profile image uploads.
 * Saves files to uploads/ folder for Cloudinary upload, then temp files are removed.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      "profile-" + uniqueSuffix + path.extname(file.originalname) || ".jpg",
    );
  },
});

/**
 * File filter: accepts only image types.
 */
const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, WebP and GIF are allowed."),
      false,
    );
  }
};

/**
 * Multer instance for single profile image upload.
 * Field name: 'image'
 */
const multerUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
}).single("image");

/**
 * Wraps multer to return consistent JSON errors for invalid uploads.
 */
const uploadProfileImage = (req, res, next) => {
  multerUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      const message =
        err.code === "LIMIT_FILE_SIZE"
          ? "File size must be under 5MB"
          : err.message;
      return res.status(400).json({ success: false, message });
    }
    if (err) {
      return res
        .status(400)
        .json({ success: false, message: err.message || "File upload failed" });
    }
    next();
  });
};

module.exports = { uploadProfileImage };
