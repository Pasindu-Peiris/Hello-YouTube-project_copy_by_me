import { Router } from "express";
import adminRouter from "./admin.mjs";
import userRouter from "./user.mjs";

const rootRouter = Router();

// Root route for checking rootRouter status
rootRouter.get("/", (req, res) => {
    res.send({ message: "Root router is running" });
});

// Mount the admin router
rootRouter.use("/admin", adminRouter);

// Mount the user router
rootRouter.use("/users", userRouter);

export default rootRouter;
