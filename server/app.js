import express from "express";
import cors from "cors";
import morgan from "morgan";
import healthRoutes from "./routes/health.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/health", healthRoutes);

// Temporary Route
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Welcome to CodeSage AI API 🚀",
//   });
// });



export default app;