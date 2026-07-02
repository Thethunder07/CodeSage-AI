import express from "express";
import {
  createCodeReview,
  getMyReviews,
  getReviewById,
  deleteReview,
} from "../controllers/codeReview.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createCodeReview);

router.get("/", protect, getMyReviews);

router.get("/:id", protect, getReviewById);

router.delete("/:id", protect, deleteReview);

export default router;