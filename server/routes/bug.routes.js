import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import {
  createBugsFromReview,
  getMyBugs,
  updateBugStatus,
  deleteBug,
} from "../controllers/bug.controller.js";

const router = express.Router();

router.post("/:reviewId", protect, createBugsFromReview);
router.get("/", protect, getMyBugs);
router.put("/:id", protect, updateBugStatus);
router.delete("/:id", protect, deleteBug);

export default router;