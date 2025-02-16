import { Router } from "express";
import DB from "../db/db.mjs";
import { body, matchedData, param, validationResult } from "express-validator";

const subRouter = Router();

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
subRouter.get('/getsubtask/:taskSubID' ,

    param('taskSubID').notEmpty().withMessage('Invalid subtask id.'),
    async (req, res) => {

    const validation_result = validationResult(req);

    if(validation_result.isEmpty()){
        try {
            const match_result = matchedData(req);
            const task = await DB.taskSub.findUnique({
                where: { taskSubID: parseInt(match_result.taskSubID) },
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

//delete by subtaskid
subRouter.delete('/deletesub/:id', async (req, res) => {

    try {
        const task = await DB.taskSub.delete({
            where: {taskSubID: parseInt(req.params.id)}
        })

        if (!task) {
            return res.status(404).json({success: false, message: 'Task not found.'});
        }

        return res.status(200).json({success: true, message: 'Task deleted successfully.'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error, message: 'Internal sever Error!'});
    }
})


//delete all subtask by userid
subRouter.delete('/deletesubuser/:id', async (req, res) => {

    try {
        const task = await DB.taskSub.deleteMany({
            where: {userID: parseInt(req.params.id)}
        })

        if (!task) {
            return res.status(404).json({success: false, message: 'Task not found.'});
        }

        return res.status(200).json({success: true, message: 'Task deleted successfully.'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error, message: 'Internal sever Error!'});
    }
})


subRouter.get('/getallsubtask', async (req, res) => {

    try {
        const task = await DB.taskSub.findMany({
            include: {
                USER: true
            }
        })

        if (!task) {
            return res.status(404).json({success: false, message: 'Task not found.'});
        }

        return res.status(200).json({success: true, task});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error, message: 'Internal sever Error!'});
    }
})


//update completed count by incrementing
subRouter.put('/update-completedcount/:id', async (req, res) => {

    try {
        const task = await DB.taskSub.update({
            where: {taskSubID: parseInt(req.params.id)},
            data: {
                completedCount: {
                    increment: 1
                }
            }
        })

        if (!task) {
            return res.status(404).json({success: false, message: 'Task not found.'});
        }

        return res.status(200).json({success: true, message: 'Task updated successfully.', updatetask: task});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error, message: 'Internal sever Error!'});
    }
})


//only send not completed task
subRouter.get('/get-only-not-done/:userID',

  param('userID').notEmpty().withMessage('Invalid user id.'),

  async (req, res) => {

  try {
      const userId = parseInt(req.params.userID);

      // Fetch all tasks
      const allTask = await DB.taskSub.findMany();

      // Fetch tasks completed by the user
      const completeTask = await DB.completedSub.findMany({
          where: { userID: userId }
      });

      // Extract taskSubIDs from completed tasks
      const completedTaskSubIDs = completeTask.map(task => task.taskSubID);

      // Filter out tasks that are already completed by the user
      const notCompletedTasks = allTask.filter(task => !completedTaskSubIDs.includes(task.taskSubID));

      // Return the filtered tasks
      return res.status(200).json({message: true, task :notCompletedTasks});

  } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err, message: 'Internal Server Error!' });
  }
});





export default subRouter;
