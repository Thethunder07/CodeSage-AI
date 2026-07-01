import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, profileImage } = req.body;

    // Step 1: Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Step 2: Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Step 3: Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profileImage,
    });

    const token = generateToken(user._id);

    // Temporary response

    const userResponse = {
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  profileImage: user.profileImage,
  createdAt: user.createdAt,
};

return res.status(201).json({
  success: true,
  message: "User registered successfully.",
  token,
  user: userResponse,
});

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};