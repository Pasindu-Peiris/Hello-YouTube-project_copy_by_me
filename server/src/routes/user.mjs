import { Router } from "express";
import bcrypt from "bcrypt";
import { body, validationResult, matchedData, param } from "express-validator";
import DB from "../db/db.mjs";
import { createToken, decodeToken } from "../middleware/jwt.mjs";

const userRouter = Router();

// Update User Data
userRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updatedUser = await DB.uSER.update({
      where: { userID: parseInt(id) },
      data: {
        username,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Update User Status
userRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }

    const updatedUser = await DB.uSER.update({
      where: { userID: parseInt(id) },
      data: { status },
    });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});


//start me

//sign up
userRouter.post('/signup',

  body("username").trim().notEmpty().withMessage("Username is required."),
  body("email").trim().isEmail().withMessage("Invalid email."),
  body("password").trim().isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  }).withMessage("Password must meet strength requirements."),

  async (req, res) => {

    try {

      const validation_result = validationResult(req);
      console.log(validation_result);

      if (validation_result.isEmpty()) {

        const match_result = matchedData(req);

        const existingUser = await DB.USER.findUnique({ where: { email: match_result.email } });
        if (existingUser) {
          return res.status(409).json({ success: false, message: "Email already in use." });
        }

        const save_user = await DB.USER.create({
          data: {
            username: match_result.username,
            email: match_result.email,
            password: await bcrypt.hash(match_result.password, 10),
            status: "active"
          }
        })

        if (!save_user) {
          return res.status(401).json({ success: false, message: "Error in Sign Up." });
        }

        return res.status(200).json({ success: true, message: "Sign Up Successfully." });

      } else {
        return res.status(404).json({ message: validation_result });
      }

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error, message: 'Internal sever Error!' })
    }
  }
)

//sign in
userRouter.post('/signin',

  body("email").trim().isEmail().withMessage("Invalid email."),
  body("password").trim().notEmpty().withMessage("Password is required."),
  async (req, res) => {

    try {

      const validation_result = validationResult(req);

      if (validation_result.isEmpty()) {

        const match_result = matchedData(req);

        const user = await DB.USER.findUnique({ where: { email: match_result.email } });

        if (!user) {
          return res.status(404).json({ success: false, message: "User not found." });
        }

        const isMatch = await bcrypt.compare(match_result.password, user.password);

        if (!isMatch) {
          return res.status(401).json({ success: false, message: "Password not match." });
        }

        const tokenData = {
          userID: user.userID,
          email: user.email,
          username: user.username,
        }

        const token = createToken(tokenData);

        return res.status(200).json({
          success: true,
          message: "Sign In Successful.",
          user: { id: user.userID, username: user.username, email: user.email },
          token,
        });


      } else {
        return res.status(404).json({ success: false, message: validation_result });
      }

    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error, message: 'Internal sever Error!' })
    }
  }
)

//get all user
userRouter.get('/getall-user', async (_, res) => {

  try {

    const users = await DB.USER.findMany();

    if (!users) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    return res.status(200).json({ success: true, users });


  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error, message: 'Internal sever Error!' })
  }

})

//get user by id
userRouter.get('/get-user/:id',

  param("id").notEmpty().withMessage("Invalid user id."),

  async (req, res) => {

    try {

      const validation_result = validationResult(req);

      if (validation_result.isEmpty()) {

        const match_result = matchedData(req);

        const user = await DB.USER.findUnique({
          where: { userID: parseInt(match_result.id) },
          include: {
            taskSub: true,
            taskVideo: true,
            completedSub: true,
            completedVideo: true
          },
        });

        if (!user) {
          return res.status(404).json({ success: false, message: "User not found." });
        }

        return res.status(200).json({ success: true, user });
      }

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error, message: 'Internal sever Error!' })
    }
  }
)

//update user by id
userRouter.put('/update-user/:id',

  param("id").notEmpty().withMessage("Invalid user id."),
  body("username").trim().notEmpty().withMessage("Username is required."),
  body("email").trim().isEmail().withMessage("Invalid email."),

  async (req, res) => {

    try {

      const validation_result = validationResult(req);

      if (validation_result.isEmpty()) {

        const match_result = matchedData(req);

        const user = await DB.USER.findUnique({ where: { userID: parseInt(req.params.id) } });

        if (!user) {
          return res.status(404).json({ success: false, message: "User not found." });
        }

        const updatedUser = await DB.USER.update({
          where: { userID: parseInt(req.params.id) },
          data: {
            username: match_result.username,
            email: match_result.email,
          },
        });

        return res.status(200).json({ success: true, user: updatedUser });

      } else {
        return res.status(404).json({ message: validation_result });
      }

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error, message: 'Internal sever Error!' })
    }

  }
)

//delete user with
userRouter.delete('/delete-user/:id',

  param("id").notEmpty().withMessage("Invalid user id."),

  async (req, res) => {

    try {

      const validation_result = validationResult(req);

      if (validation_result.isEmpty()) {

        const match_result = matchedData(req);

        const findUser = await DB.USER.findUnique({ where: { userID: parseInt(match_result.id) } });

        if (!findUser) {
          return res.status(404).json({ success: false, message: "User not found." });
        }

        await DB.USER.delete({
          where: { userID: parseInt(match_result.id) },
          include: {
            taskSub: true,
            taskVideo: true,
            completedSub: true,
            completedVideo: true
          }
        });

        res.status(200).json({ success: true, message: "User deleted successfully." });

      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }

  }
)


//get data from jwt
userRouter.get('/get-data-from-jwt/:token',
  param('token').notEmpty().withMessage("Invalid token."),

  async (req, res) => {

    try {

      const validation_result = validationResult(req);

      if (validation_result.isEmpty()) {

        const match_result = matchedData(req);
        const token = match_result.token;
        const decoded = decodeToken(token);

        return res.status(200).json({ success: true, decoded });

      }



    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }



  })




export default userRouter;
