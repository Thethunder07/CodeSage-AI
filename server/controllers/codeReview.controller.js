import CodeReview from "../models/codeReview.model.js";
import { reviewCodeWithAI } from "../services/gemini.service.js";

export const createCodeReview = async (req, res) => {
  try {
    const { title, language, code } = req.body;

    if (!title || !language || !code) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, language and code.",
      });
    }

    console.log("Calling Gemini...");

const aiReview = await reviewCodeWithAI(language, code);

console.log("Gemini Response:", aiReview);

    const review = await CodeReview.create({
      user: req.user._id,
      title,
      language,
      code,
      aiReview,
      overallScore: aiReview.score,
      status: "Reviewed",
    });

    return res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get all reviews of logged-in user
export const getMyReviews = async (req, res) => {
  try {
    const reviews = await CodeReview.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single review
export const getReviewById = async (req, res) => {
  try {
    const review = await CodeReview.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    return res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const review = await CodeReview.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};