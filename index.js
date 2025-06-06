import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import db from "./config/Database.js";
import AuthUser from "./models/AuthUserModel.js";
import User from "./models/UserModel.js";

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Logging middleware (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Database connection
try {
  await db.authenticate(); // Test the database connection
  console.log("Database connected...");
} catch (error) {
  console.error("Database connection error:", error);
}

// Sync all models at once
await db.sync();

// Routes
app.use("/api", UserRoute); // Prefix all routes with /api
app.use("/api/auth", AuthRoute); // Prefix auth routes with /api/auth

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable for port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});