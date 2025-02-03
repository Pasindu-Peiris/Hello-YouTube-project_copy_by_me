import { Router } from "express";
import DB from "../db/db.mjs";
import { body, param, validationResult } from "express-validator";

const completedSubRouter = Router();

// CREATE: Create a new completedSub entry
completedSubRouter.post(
  "/",
  [
    body("userID").isInt().withMessage("User ID must be an integer."),
    body("taskSubID").isInt().withMessage("Task Sub ID must be an integer."),
    body("proofLink").isURL().withMessage("Proof link must be a valid URL."),
    body("status").isString().withMessage("Status must be a string."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userID, taskSubID, proofLink, status } = req.body;
    try {
      const newCompletedSub = await DB.completedSub.create({
        data: { userID, taskSubID, proofLink, status },
      });
      res.status(201).json(newCompletedSub);
    } catch (error) {
      console.error("Error creating completedSub:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// READ: Get all completedSub entries
completedSubRouter.get("/", async (req, res) => {
  try {
    const completedSubs = await DB.completedSub.findMany({
      include: {
        USER: true,
        taskSub: true,
      },
    });
    res.status(200).json(completedSubs);
  } catch (error) {
    console.error("Error fetching completedSub:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// READ: Get a specific completedSub by ID
completedSubRouter.get(
  "/:id",
  [param("id").isInt().withMessage("ID must be an integer.")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
      const completedSub = await DB.completedSub.findUnique({
        where: { completedSubID: parseInt(id, 10) },
        include: { USER: true, taskSub: true },
      });
      if (!completedSub) {
        return res.status(404).json({ error: "CompletedSub not found." });
      }
      res.status(200).json(completedSub);
    } catch (error) {
      console.error("Error fetching completedSub:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// UPDATE: Update the status of a completedSub
completedSubRouter.put(
  "/:id",
  [
    param("id").isInt().withMessage("ID must be an integer."),
    body("status").isString().withMessage("Status must be a string."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;
    try {
      const updatedCompletedSub = await DB.completedSub.update({
        where: { completedSubID: parseInt(id, 10) },
        data: { status },
      });
      res.status(200).json(updatedCompletedSub);
    } catch (error) {
      console.error("Error updating completedSub:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// DELETE: Delete a completedSub entry
completedSubRouter.delete(
  "/:id",
  [param("id").isInt().withMessage("ID must be an integer.")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
      await DB.completedSub.delete({
        where: { completedSubID: parseInt(id, 10) },
      });
      res.status(200).json({ message: "CompletedSub deleted successfully." });
    } catch (error) {
      console.error("Error deleting completedSub:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default completedSubRouter;
