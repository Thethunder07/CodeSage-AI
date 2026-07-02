import Bug from "../models/bug.model.js";
import CodeReview from "../models/codeReview.model.js";

export const createBugsFromReview = async (req, res) => {
  try {
    const review = await CodeReview.findOne({
      _id: req.params.reviewId,
      user: req.user._id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    const bugsList = review.aiReview?.bugs;

    if (!bugsList) {
      return res.status(400).json({
        success: false,
        message: "AI review not generated properly.",
      });
    }

    const bugs = [];

    // If no bugs found → create fallback bug
    if (bugsList.length === 0) {
      const fallbackBug = await Bug.create({
        review: review._id,
        user: req.user._id,
        title: "No critical bugs found",
        description:
          "AI did not detect any bugs. You can still improve code quality and edge cases.",
        severity: "Low",
      });

      return res.status(201).json({
        success: true,
        count: 1,
        bugs: [fallbackBug],
      });
    }

    // If bugs exist → create real bug tickets
    for (const bug of bugsList) {
      const newBug = await Bug.create({
        review: review._id,
        user: req.user._id,
        title: bug.title,
        description: bug.description,
        severity: bug.severity || "Medium",
      });

      bugs.push(newBug);
    }

    return res.status(201).json({
      success: true,
      count: bugs.length,
      bugs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyBugs = async (req, res) => {
  try {
    const bugs = await Bug.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bugs.length,
      bugs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const updateBugStatus = async (req, res) => {
  try {
    const bug = await Bug.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!bug) {
      return res.status(404).json({ success: false, message: "Bug not found" });
    }

    bug.status = req.body.status || bug.status;
    await bug.save();

    res.json({
      success: true,
      message: "Bug updated",
      bug,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteBug = async (req, res) => {
  try {
    await Bug.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.json({
      success: true,
      message: "Bug deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};