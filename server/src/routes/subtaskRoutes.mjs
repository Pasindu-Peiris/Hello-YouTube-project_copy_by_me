import { Router } from "express";
import DB from "../db/db.mjs";
import { body, param, validationResult } from "express-validator";

const subRouter = Router();

// CREATE: Assign submission task to a user
subRouter.post(
  "/assign",
  [
    body("userID").isInt().withMessage("User ID must be an integer."),
    body("tasks")
      .isArray({ min: 1 })
      .withMessage("Tasks should be an array and cannot be empty."),
    body("tasks.*.channelLink")
      .isURL()
      .withMessage("Each channelLink must be a valid URL."),
    body("tasks.*.description")
      .isString()
      .withMessage("Each description must be a string."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userID, tasks } = req.body;
    try {
      // Create task assignments for the user
      const taskAssignments = tasks.map((task) => ({
        userID,
        channelLink: task.channelLink,
        description: task.description || "No description provided",
        status: "pending",
        completedCount: 0,
      }));

      const createdTasks = await DB.taskSub.createMany({ data: taskAssignments });
      res.status(201).json({ message: "Task assignments created.", createdTasks });
    } catch (error) {
      console.error("Error in /assign route:", error.stack || error);
      res.status(500).json({ message: "Error assigning tasks.", error: error.message });
    }
  }
);

// READ: Fetch all submission tasks by userID
subRoutercreate.get(
  "/:userID",
  [param("userID").isInt().withMessage("User ID must be an integer.")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userID } = req.params;
    try {
      const tasks = await DB.taskSub.findMany({
        where: { userID: parseInt(userID, 10) },
      });

      if (!tasks.length) {
        return res.status(404).json({ message: "No tasks found for this user." });
      }

      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error in /:userID route:", error.stack || error);
      res.status(500).json({ message: "Error fetching tasks.", error: error.message });
    }
  }
);

// READ: Fetch a specific task by taskSubID
subRouterRead.get(
  "/task/:taskSubID",
  [param("taskSubID").isInt().withMessage("Task Sub ID must be an integer.")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { taskSubID } = req.params;
    try {
      const task = await DB.taskSub.findFirst({
        where: { taskSubID: parseInt(taskSubID, 10) },
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found." });
      }

      res.status(200).json(task);
    } catch (error) {
      console.error("Error in /task/:taskSubID route:", error.stack || error);
      res.status(500).json({ message: "Error fetching task.", error: error.message });
    }
  }
);

// UPDATE: Update task status by taskSubID
subRouterupdate.put(
  "/:taskSubID",
  [
    param("taskSubID").isInt().withMessage("Task Sub ID must be an integer."),
    body("status").isString().withMessage("Status must be a string."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { taskSubID } = req.params;
    const { status } = req.body;

    try {
      const updatedTask = await DB.taskSub.update({
        where: { taskSubID: parseInt(taskSubID, 10) },
        data: { status },
      });
      res.status(200).json({ message: "Task updated successfully.", updatedTask });
    } catch (error) {
      console.error("Error in /:taskSubID route:", error.stack || error);
      res.status(500).json({ message: "Error updating task.", error: error.message });
    }
  }
);

// DELETE: Delete a task by taskSubID
subRouterdelete.delete(
  "/:taskSubID",
  [param("taskSubID").isInt().withMessage("Task Sub ID must be an integer.")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { taskSubID } = req.params;

    try {
      await DB.taskSub.delete({
        where: { taskSubID: parseInt(taskSubID, 10) },
      });
      res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
      console.error("Error in DELETE /:taskSubID route:", error.stack || error);
      res.status(500).json({ message: "Error deleting task.", error: error.message });
    }
  }
);

export default subRouter;
