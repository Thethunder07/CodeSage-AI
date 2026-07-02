import mongoose from "mongoose";

const codeReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    aiReview: {
  summary: String,
  bugs: [],
  suggestions: [],
  score: Number,
  timeComplexity: String,
  spaceComplexity: String
},

    overallScore: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Reviewed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const CodeReview = mongoose.model("CodeReview", codeReviewSchema);

export default CodeReview;