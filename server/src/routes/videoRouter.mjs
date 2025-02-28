import { Router } from "express";
import DB from "../db/db.mjs";
import { body, param, validationResult, matchedData } from "express-validator";

const videoRouter = Router();

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
      const tasks = await DB.taskVideo.findMany({
        where: { userID: parseInt(userID, 10) },
      });
      if (!tasks.length) {
        return res
          .status(404)
          .json({ message: "No video tasks found for this user." });
      }
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error in /get/user/:userID route:", error.stack || error);
      res
        .status(500)
        .json({ message: "Error fetching video tasks.", error: error.message });
    }
  }
);

// READ: Fetch a specific video task by taskVideoID
videoRouter.get(
  "/get/task/:taskVideoID",
  [
    param("taskVideoID")
      .isInt()
      .withMessage("Task Video ID must be an integer."),
  ],
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
        return res
          .status(404)
          .json({
            message: "No video task found with the given Task Video ID.",
          });
      }
      res.status(200).json(task);
    } catch (error) {
      console.error(
        "Error in /get/task/:taskVideoID route:",
        error.stack || error
      );
      res
        .status(500)
        .json({
          message: "Error fetching the video task.",
          error: error.message,
        });
    }
  }
);

// UPDATE: Update task status by userID and taskVideoID
videoRouter.put(
  "/update/:userID/:taskVideoID",
  [
    param("userID").isInt().withMessage("User ID must be an integer."),
    param("taskVideoID")
      .isInt()
      .withMessage("Task Video ID must be an integer."),
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
        where: {
          userID: parseInt(userID, 10),
          taskVideoID: parseInt(taskVideoID, 10),
        },
        data: { status },
      });
      res
        .status(200)
        .json({ message: "Task updated successfully.", updatedTask });
    } catch (error) {
      console.error(
        "Error in /update/:userID/:taskVideoID route:",
        error.stack || error
      );
      res
        .status(500)
        .json({ message: "Error updating task.", error: error.message });
    }
  }
);

// DELETE: Delete a video task by userID and taskVideoID
videoRouter.delete(
  "/delete/:userID/:taskVideoID",
  [
    param("userID").isInt().withMessage("User ID must be an integer."),
    param("taskVideoID")
      .isInt()
      .withMessage("Task Video ID must be an integer."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userID, taskVideoID } = req.params;

    try {
      await DB.taskVideo.deleteMany({
        where: {
          userID: parseInt(userID, 10),
          taskVideoID: parseInt(taskVideoID, 10),
        },
      });
      res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
      console.error(
        "Error in DELETE /delete/:userID/:taskVideoID route:",
        error.stack || error
      );
      res
        .status(500)
        .json({ message: "Error deleting task.", error: error.message });
    }
  }
);

videoRouter.post(
  "/add-video/:userID",

  param("userID").notEmpty().withMessage("user id is empty"),
  body("videoLink").notEmpty().withMessage("video link is empty"),

  async (req, res) => {
    try {
      const result_validation = validationResult(req);

      console.log(result_validation);

      if (result_validation.isEmpty()) {
        const match_result = matchedData(req);

        //check Link exist
        const checkLink = await DB.taskVideo.findMany({
          where: {
            videoLink: match_result.videoLink,
          },
        });

        console.log(checkLink);

        if (checkLink.length > 0) {
          return res.status(201).json({ success: false, message: "Link already Exist" });
        }

        const CreateVideo = await DB.taskVideo.create({
          data: {
            userID: parseInt(req.params.userID),
            videoLink: match_result.videoLink,
            description: "none_desc",
            status: "Active",
            completedCount: 0,
            watchedTime: 0,
          },
        });

        if (!CreateVideo) {
          return res
            .status(404)
            .json({ success: false, message: "Link not created." });
        }

        return res.status(201).json({
          success: true,
          message: "Link created successfully.",
          task: CreateVideo,
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: validation_result });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: error, message: "Internal sever Error!" });
    }
  }
);

videoRouter.get("/get-video", async (_, res) => {
  try {
    const videoUrl = await DB.taskVideo.findMany({
      include: {
        USER: true,
      },
    });

    if (!videoUrl) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found." });
    }

    return res.status(200).json({ success: true, videos: videoUrl });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error, message: "Internal sever Error!" });
  }
});

videoRouter.get(
  "/get-by-id/:userID",

  param("userID").notEmpty().withMessage("userID is Empty"),

  async (req, res) => {
    try {
      const result_validation = validationResult(req);

      if (result_validation.isEmpty()) {
        const match_result = matchedData(req);

        const findVideo = await DB.taskVideo.findMany({
          where: {
            userID: parseInt(match_result.userID)
          },
        });

        if (!findVideo) {
          return res
            .status(404)
            .json({ success: false, message: "Video not found." });
        }

        return res.status(200).json({ success: true, videos: findVideo });
      } else {
        return res.status(400).json({ message: result_validation })
      }


    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: error, message: "Internal sever Error!" });
    }
  }
);


//get only not done
videoRouter.get('/only-get-not-done/:userID',
  
  param('userID').notEmpty().withMessage('userID is Empty'),
  async (req, res) => {

    try {

      const result_validation = validationResult(req);

      if(result_validation.isEmpty()){

        const match_result = matchedData(req);

        const videoUrl = await DB.taskVideo.findMany({
          include: {
            USER: true,
          },
        });

        const completeVideos = await DB.completedVideo.findMany({
          where: {
            userID: parseInt(match_result.userID)
          }
        })

        console.log(completeVideos);

        console.log(videoUrl);

        // Extract taskSubIDs from completed tasks
      const completedTaskSubIDs = completeVideos.map(task => task.taskVideoID);

      // Filter out tasks that are already completed by the user
      const notCompletedTasks = videoUrl.filter(task => !completedTaskSubIDs.includes(task.taskVideoID));

      // Return the filtered tasks
      return res.status(200).json({message: true, videos:notCompletedTasks});



      }
      
    } catch (error) {
      
    }




})





export default videoRouter;
