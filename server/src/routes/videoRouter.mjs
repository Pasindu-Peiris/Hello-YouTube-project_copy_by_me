import { Router } from "express";
import DB from "../db/db.mjs";
import { body, param, validationResult } from "express-validator";

const videoRouter = Router();

// CREATE: Assign video tasks
videoRouter.post(
  "/assign",
  [
    body("userID").isInt().withMessage("User ID must be an integer."),
    body("videos")
      .isArray({ min: 1 })
      .withMessage("Videos should be an array and cannot be empty."),
    body("videos.*.videoLink").isURL().withMessage("Each videoLink must be a valid URL."),
    body("videos.*.description").isString().withMessage("Each description must be a string."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userID, videos } = req.body;
    try {
      const videoTasks = videos.map((video) => ({
        userID,
        videoLink: video.videoLink,
        description: video.description || "Default description",
        status: "pending",
        completedCount: 0,
      }));

      const createdTasks = await DB.taskVideo.createMany({ data: videoTasks });
      res.status(201).json({ message: "Video tasks assigned.", createdTasks });
    } catch (error) {
      console.error("Error in /assign route:", error.stack || error);
      res.status(500).json({ message: "Error assigning video tasks.", error: error.message });
    }
  }
);

// READ: Fetch all video tasks by userID
videoRouter.get(
  "/get/user/:userID",
  [param("userID").isInt().withMessage("User ID must be an integer.")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userID } = req.params;
    try {
      const tasks = await DB.taskVideo.findMany({ where: { userID: parseInt(userID, 10) } });
      if (!tasks.length) {
        return res.status(404).json({ message: "No video tasks found for this user." });
      }
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error in /get/user/:userID route:", error.stack || error);
      res.status(500).json({ message: "Error fetching video tasks.", error: error.message });
    }
  }
);

// READ: Fetch a specific video task by taskVideoID
videoRouter.get(
  "/get/task/:taskVideoID",
  [param("taskVideoID").isInt().withMessage("Task Video ID must be an integer.")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { taskVideoID } = req.params;
    try {
      const task = await DB.taskVideo.findFirst({
        where: { taskVideoID: parseInt(taskVideoID, 10) },
      });
      if (!task) {
        return res.status(404).json({ message: "No video task found with the given Task Video ID." });
      }
      res.status(200).json(task);
    } catch (error) {
      console.error("Error in /get/task/:taskVideoID route:", error.stack || error);
      res.status(500).json({ message: "Error fetching the video task.", error: error.message });
    }
  }
);

// UPDATE: Update task status by userID and taskVideoID
videoRouter.put(
  "/update/:userID/:taskVideoID",
  [
    param("userID").isInt().withMessage("User ID must be an integer."),
    param("taskVideoID").isInt().withMessage("Task Video ID must be an integer."),
    body("status").isString().withMessage("Status must be a string."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userID, taskVideoID } = req.params;
    const { status } = req.body;

    try {
      const updatedTask = await DB.taskVideo.updateMany({
        where: { userID: parseInt(userID, 10), taskVideoID: parseInt(taskVideoID, 10) },
        data: { status },
      });
      res.status(200).json({ message: "Task updated successfully.", updatedTask });
    } catch (error) {
      console.error("Error in /update/:userID/:taskVideoID route:", error.stack || error);
      res.status(500).json({ message: "Error updating task.", error: error.message });
    }
  }
);

// DELETE: Delete a video task by userID and taskVideoID
videoRouter.delete(
  "/delete/:userID/:taskVideoID",
  [
    param("userID").isInt().withMessage("User ID must be an integer."),
    param("taskVideoID").isInt().withMessage("Task Video ID must be an integer."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userID, taskVideoID } = req.params;

    try {
      await DB.taskVideo.deleteMany({ where: { userID: parseInt(userID, 10), taskVideoID: parseInt(taskVideoID, 10) } });
      res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
      console.error("Error in DELETE /delete/:userID/:taskVideoID route:", error.stack || error);
      res.status(500).json({ message: "Error deleting task.", error: error.message });
    }
  }
);

export default videoRouter;
