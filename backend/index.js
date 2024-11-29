import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
app.use(cors({ origin: "http://localhost:5000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);

// Serve frontend in production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build"))); // Update "dist" to "build" if using React

    // Catch-all route to serve index.html for any unmatched routes (like a login page)
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); // Change "dist" to "build" if using React
    });
}

// Start server and connect to database
app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port:", PORT);
});
