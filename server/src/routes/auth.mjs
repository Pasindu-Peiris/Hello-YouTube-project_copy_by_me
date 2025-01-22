import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult, matchedData } from "express-validator";
import DB from "../db/db.mjs";

const authRouter = Router();

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
};

// Registration Route
authRouter.post(
  "/register",
  [
    body("username").trim().notEmpty().withMessage("Username is required."),
    body("email").trim().isEmail().withMessage("Invalid email."),
    body("password")
      .trim()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .withMessage("Password must meet strength requirements."),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { username, email, password } = matchedData(req);

      // Check if email already exists
      const existingUser = await DB.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ success: false, message: "Email already in use." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the user
      const newUser = await DB.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          status: "active", // default status
          role: "user", // default role
        },
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        user: { id: newUser.id, username: newUser.username, email: newUser.email },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  }
);

// Login Route
authRouter.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Invalid email."),
    body("password").trim().notEmpty().withMessage("Password is required."),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email, password } = matchedData(req);

      // Check if user exists
      const user = await DB.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials." });
      }

      // Generate JWT token
      const token = generateToken(user);

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        user: { id: user.id, username: user.username, email: user.email },
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  }
);

export default authRouter;
