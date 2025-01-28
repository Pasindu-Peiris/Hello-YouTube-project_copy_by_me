import { Router } from "express";
import bcrypt from "bcrypt";
import { body, validationResult, matchedData } from "express-validator";
import DB from "../db/db.mjs";

const authRouter = Router();
/*
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
      console.log("Request body:", req.body); // Log the request body

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = matchedData(req);

      // Check if email already exists
      const existingUser = await DB.USER.findUnique({ where: { email } }); // Adjusted to `DB.USER`
      console.log("Existing user:", existingUser); // Log the existing user
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the user
      const newUser = await DB.USER.create({
        data: {
          username,
          email,
          password: hashedPassword,
          status: "active", // default status
        },
      });

      return res.status(201).json({ message: "User registered successfully.", user: newUser });
    } catch (error) {
      console.error("Error in /register route:", error); // Log the error
      return res.status(500).json({ message: "Internal server error." });
    }
  }
); */

export default authRouter;
