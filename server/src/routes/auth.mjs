import { Router } from "express";
import bcrypt from "bcrypt";
import { body, validationResult, matchedData } from "express-validator";
import DB from "../db/db.mjs";

const authRouter = Router();

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
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = matchedData(req);

      // Check if email already exists
      const existingUser = await DB.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use." });
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
        },
      });

      return res.status(201).json({ message: "User registered successfully.", user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
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
          return res.status(400).json({ errors: errors.array() });
        }
  
        const { email, password } = matchedData(req);
  
        // Check if user exists
        const user = await DB.user.findUnique({ where: { email } });
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }
  
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials." });
        }
  
        return res.status(200).json({ message: "Login successful.", user });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
      }
    }
  );
  








export default authRouter;
