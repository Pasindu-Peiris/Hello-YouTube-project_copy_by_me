import { Router } from "express";
import DB from "../db/db.mjs";
import { body, param, validationResult, matchedData } from "express-validator";

const completedVideoRouter = Router();

// GET: Fetch completed videos by userID
completedVideoRouter.get("/get/user/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    const completedVideos = await DB.completedVideo.findMany({
      where: { userID: parseInt(userID, 10) },
      select: {
        completedVideoID: true,
        userID: true,
        taskVideoID: true,
        submissionDate: true,
        proofLink: true,
        status: true,
        USER: {
          select: {
            userID: true,
            username: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json(completedVideos);
  } catch (error) {
    console.error("Error fetching completed videos by userID:", error);
    res.status(500).json({ message: "Error fetching completed videos.", error: error.message });
  }
});

// GET: Fetch completed videos by taskVideoID
completedVideoRouter.get("/get/task/:taskVideoID", async (req, res) => {
  const { taskVideoID } = req.params;
  try {
    const completedVideos = await DB.completedVideo.findMany({
      where: { taskVideoID: parseInt(taskVideoID, 10) },
      select: {
        completedVideoID: true,
        userID: true,
        taskVideoID: true,
        submissionDate: true,
        proofLink: true,
        status: true,
        USER: {
          select: {
            userID: true,
            username: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json(completedVideos);
  } catch (error) {
    console.error("Error fetching completed videos by taskVideoID:", error);
    res.status(500).json({ message: "Error fetching completed videos.", error: error.message });
  }
});

// UPDATE: Update completed video entry by userID and taskVideoID
completedVideoRouter.put(
  "/update/:userID/:taskVideoID",
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
    const { status, proofLink } = req.body;

    try {
      const updatedEntry = await DB.completedVideo.updateMany({
        where: { userID: parseInt(userID, 10), taskVideoID: parseInt(taskVideoID, 10) },
        data: { status, proofLink },
      });
      res.status(200).json({ message: "Completed video entry updated successfully.", updatedEntry });
    } catch (error) {
      console.error("Error updating completed video entry:", error);
      res.status(500).json({ message: "Error updating completed video entry.", error: error.message });
    }
  }
);

// DELETE: Delete completed video entry by userID and taskVideoID
completedVideoRouter.delete(
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
      await DB.completedVideo.deleteMany({
        where: { userID: parseInt(userID, 10), taskVideoID: parseInt(taskVideoID, 10) },
      });
      res.status(200).json({ message: "Completed video entry deleted successfully." });
    } catch (error) {
      console.error("Error deleting completed video entry:", error);
      res.status(500).json({ message: "Error deleting completed video entry.", error: error.message });
    }
  }
);



completedVideoRouter.post('/add-comvideo/:userID',
  
  param('userID').notEmpty().withMessage('Invalid user id.'),
  body('taskVideoID').notEmpty().withMessage('Invalid task video id.'),
  
  async (req, res) => {

    try {

      const result_validation = validationResult(req);

      if(result_validation.isEmpty()){

        const match_result = matchedData(req);

        const completedVideo = await DB.completedVideo.create({
          data: {
            userID: parseInt(req.params.userID),
            taskVideoID: parseInt(match_result.taskVideoID),
            proofLink: "none",
            status: 'Active'
            
          }
        })

        if(!completedVideo){
          return res.status(404).json({success: false, message: 'Completed video not added.'});
        }

        return res.status(200).json({success: true, message: 'Completed video added successfully.', video :completedVideo});


      }
      
    } catch (error) {

      console.error('Error in POST /add-comvideo/:userID route:', error.stack || error);
      console.log(error);
      return res
        .status(500)
        .json({ error: error, message: "Internal sever Error!" });
    
      
    }



})

export default completedVideoRouter;
