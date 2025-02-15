import { Router } from "express";
import DB from "../db/db.mjs";
import { body, matchedData, param, validationResult } from "express-validator";

const subRouter = Router();

// READ: Fetch all submission tasks by userID
subRouter.get(
  "/create/:userID",
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
        return res
          .status(404)
          .json({ message: "No tasks found for this user." });
      }

      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error in /:userID route:", error.stack || error);
      res
        .status(500)
        .json({ message: "Error fetching tasks.", error: error.message });
    }
  }
);

// READ: Fetch a specific task by taskSubID
subRouter.get(
  "/read/task/:taskSubID",
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
      res
        .status(500)
        .json({ message: "Error fetching task.", error: error.message });
    }
  }
);

// UPDATE: Update task status by taskSubID
subRouter.put(
  "/update/:taskSubID",
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
      res
        .status(200)
        .json({ message: "Task updated successfully.", updatedTask });
    } catch (error) {
      console.error("Error in /:taskSubID route:", error.stack || error);
      res
        .status(500)
        .json({ message: "Error updating task.", error: error.message });
    }
  }
);

// DELETE: Delete a task by taskSubID
subRouter.delete(
  "/delete/:taskSubID",
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
      res
        .status(500)
        .json({ message: "Error deleting task.", error: error.message });
    }
  }
);

//create task
subRouter.post(
  "/add-sub/:id",

  param("id").notEmpty().withMessage("Invalid user id."),
  body("channelLink")
    .trim()
    .notEmpty()
    .withMessage("Channel Link is required."),
  body("description").trim().notEmpty().withMessage("Description is required."),

  async (req, res) => {
    const validation_result = validationResult(req);

    if (validation_result.isEmpty()) {
      try {
        const match_result = matchedData(req);

        const CreateTask = await DB.taskSub.create({
          data: {
            userID: parseInt(req.params.id),
            channelLink: match_result.channelLink,
            description: match_result.description,
            status: "Active",
            completedCount: 0,
          },
        });

        if (!CreateTask) {
          return res
            .status(404)
            .json({ success: false, message: "Task not created." });
        }

        return res.status(201).json({
            success: true,
            message: "Task created successfully.",
            task: CreateTask,
          });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ error: error, message: "Internal sever Error!" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: validation_result });
    }
  }
);

//get task by userid
subRouter.get(
  "/get-task/:id",

  param("id").notEmpty().withMessage("Invalid user id."),

  async (req, res) => {
    const validation_result = validationResult(req);

    if (validation_result.isEmpty()) {
      try {
        const match_result = matchedData(req);

        const task = await DB.taskSub.findMany({
          where: { userID: parseInt(req.params.id) },
          include: {
            USER: true,
          },
        });

        if (!task) {
          return res.status(404).json({ success: false, message: "Task not found." });
        }

        return res.status(200).json({ success: true, task });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ error: error, message: "Internal sever Error!" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: validation_result });
    }
  }
);

//get sub task by subtaskid
subRouter.get('/getsubtask/:id' ,

    param('id').notEmpty().withMessage('Invalid subtask id.'),
    async (req, res) => {

    const validation_result = validationResult(req);

    if(validation_result.isEmpty()){
        try {
            const match_result = matchedData(req);
            const task = await DB.taskSub.findUnique({
                where: { taskSubID: parseInt(match_result.id) },
                include: {
                    USER: true,
                }
            })

            if (!task) {
                return res.status(404).json({ success: false, message: 'Task not found.' });
            }

            return res.status(200).json({ success: true, task });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error, message: 'Internal sever Error!' });
        }


      }
});


//update task using subtaskid
subRouter.put('/update-subtask/:id',

    param('id').notEmpty().withMessage('Invalid subtask id.'),
    body('channelLink').trim().notEmpty().withMessage('Channel Link is required.'),
    body('description').trim().notEmpty().withMessage('Description is required.'),

    async (req, res) => {

      const validation_result = validationResult(req);

      try {

          if (validation_result.isEmpty()) {
              const match_result = matchedData(req);

              const task = await DB.taskSub.update({
                  where: {taskSubID: parseInt(match_result.id)},
                  data: {
                      channelLink: match_result.channelLink,
                      description: match_result.description,
                  }
              })

              if (!task) {
                  return res.status(404).json({success: false, message: 'Task not found.'});
              }

              return res.status(200).json({success: true, message: 'Task updated successfully.', updatetask: task});

          }else{
              return res.status(404).json({success: false, message: validation_result});
          }

      }catch(error)
          {
              console.log(error);
              return res.status(500).json({error: error, message: 'Internal sever Error!'});
          }


      }
) 












export default subRouter;
