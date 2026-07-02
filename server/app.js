import express from "express";
import cors from "cors";
import morgan from "morgan";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import codeReviewRoutes from "./routes/codeReview.routes.js";
import bugRoutes from "./routes/bug.routes.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/code-reviews", codeReviewRoutes);
app.use("/api/bugs", bugRoutes);




export default app;