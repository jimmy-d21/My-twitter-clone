import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

import connectDB from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import notificationRoutes from "./routes/notification.route.js";
import postRoutes from "./routes/post.route.js";

dotenv.config(); // Load environment variables from .env

cloudinary.config({
  cloud_name: process.env.CLODINARY_NAME,
  api_key: process.env.CLODINARY_API_KEY,
  api_secret: process.env.CLODINARY_API_SECRET_KEY,
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" })); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies for auth middleware

app.use("/api/auth", authRoutes); // Mount auth routes
app.use("/api/users", userRoutes); // Mount user routes
app.use("/api/posts", postRoutes); // Mount post routes
app.use("/api/notifications", notificationRoutes); // Mount notification routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB(); // Connect to MongoDB
  console.log(`Server is running on PORT: ${PORT}`);
});
