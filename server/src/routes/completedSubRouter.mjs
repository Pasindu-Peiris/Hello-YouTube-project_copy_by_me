import { Router } from "express";
import DB from "../db/db.mjs";
import { body, param, validationResult, matchedData } from "express-validator";
import multer from 'multer';
import path from 'path';

const completedSubRouter = Router();

// CREATE: Create a new completedSub entry
completedSubRouter.post(
  "/create",
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
completedSubRouter.get("/read", async (req, res) => {
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
  "/read/:id",
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
  "/update/:id",
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
  "/delete/:id",
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


//start me

//create multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, 'src/upload');
    },
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }

});

//upload image
const upload = multer({
    storage: storage
});



completedSubRouter.post('/create-completesub/:taskSubID', upload.single('proofLink'),
    param('taskSubID').notEmpty().withMessage('Task Sub ID is required.'),
    body('userID').notEmpty().withMessage('User ID is required.'),

    async (req, res) => {

    try{
        const validation_result = validationResult(req);

        if(validation_result.isEmpty()) {
            const match_result = matchedData(req);

            const completeTask = await DB.completedSub.create({
                data: {
                    userID: parseInt(match_result.userID),
                    taskSubID: parseInt(match_result.taskSubID),
                    proofLink: req.file.filename,
                    status: 'Active'
                }
            })

            if(!completeTask){
                return res.status(404).json({success: false, message: 'Task not found.'});
            }

            return res.status(200).json({success: true, message: 'Task completed successfully.', task: completeTask});

        }else{
            return res.status(404).json({success: false, message: validation_result});
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({error: error, message: 'Internal sever Error!'});
    }

})


completedSubRouter.get('/get-completedsub/:id',
    param('id').notEmpty().withMessage('Invalid user id.'),

    async (req, res) => {
    const validation_result = validationResult(req);

    if(validation_result.isEmpty()) {
        try {
            const match_result = matchedData(req);

            const task = await DB.completedSub.findMany({
                where: { completedSubID: parseInt(req.params.id) },
                include: {
                    USER: true,
                    taskSub: true,
                },
            });

            if(!task){
                return res.status(404).json({success: false, message: 'Task not found.'});
            }

            return res.status(200).json({success: true, task});

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error, message: 'Internal sever Error!'});
        }
    } else {
        return res.status(404).json({success: false, message: validation_result});
    }
})













export default completedSubRouter;
