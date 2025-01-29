import { Router } from "express";
import adminRouter from "./admin.mjs";
import userRouter from "./user.mjs";
import videoRouter from "./videoRouter.mjs";
import completedSubRouter from "./completedSubRouter.mjs";


const rootRouter = Router();

// Root route for checking rootRouter status
rootRouter.get("/", (req, res) => {
    res.send({ message: "Root router is running" });
});

//router
rootRouter.use('/admin', adminRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/videos",videoRouter);
rootRouter.use("/completedSub", completedSubRouter);
export default rootRouter;
