import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://movie-app-frontend-g51p.onrender.com",
    credentials: true,
  }),
);

// Routes - Only import routes that actually exist
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";

// Only use routes that exist
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is working!", status: "success" });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(` Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
