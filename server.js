const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");
const productsRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const bookRoutes = require("./routes/bookRoutes");
const bookCategoryRoutes = require("./routes/bookCategoryRoutes");
const bookReviewRoutes = require("./routes/bookReviewRoutes");
const reviewProductRoutes = require("./routes/reviewProductRoutes");
const notFound = require("./middlewares/notFound");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6050;

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: "Too many requests" },
  }),
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/wishlists", wishlistRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/book-categories", bookCategoryRoutes);
app.use("/api/v1/book-reviews", bookReviewRoutes);
app.use("/api/v1/product-reviews", reviewProductRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
