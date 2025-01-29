import { Router } from "express";
import DB from "../db/db.mjs";

const completedSubRouter = Router();

// ✅ Create a new completedSub entry
completedSubRouter.post("/", async (req, res) => {
  try {
    const { userID, taskSubID, proofLink, status } = req.body;

    if (!userID || !taskSubID || !proofLink || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCompletedSub = await DB.completedSub.create({
      data: { userID, taskSubID, proofLink, status },
    });

    res.status(201).json(newCompletedSub);
  } catch (error) {
    console.error("Error creating completedSub:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Get all completedSub entries
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

// ✅ Get a specific completedSub by ID
completedSubRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const completedSub = await DB.completedSub.findUnique({
      where: { completedSubID: parseInt(id) },
      include: { USER: true, taskSub: true },
    });

    if (!completedSub) {
      return res.status(404).json({ error: "completedSub not found" });
    }

    res.status(200).json(completedSub);
  } catch (error) {
    console.error("Error fetching completedSub:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Update the status of a completedSub
completedSubRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedCompletedSub = await DB.completedSub.update({
      where: { completedSubID: parseInt(id) },
      data: { status },
    });

    res.status(200).json(updatedCompletedSub);
  } catch (error) {
    console.error("Error updating completedSub:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Delete a completedSub entry
completedSubRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await DB.completedSub.delete({
      where: { completedSubID: parseInt(id) },
    });

    res.status(200).json({ message: "completedSub deleted successfully" });
  } catch (error) {
    console.error("Error deleting completedSub:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default completedSubRouter;
