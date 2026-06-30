import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Temporary Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to CodeSage AI API 🚀",
  });
});

export default app;