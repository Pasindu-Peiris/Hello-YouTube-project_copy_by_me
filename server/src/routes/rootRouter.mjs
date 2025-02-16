import { Router } from "express";
import adminRouter from "./admin.mjs";
import userRouter from "./user.mjs";
import videoRouter from "./videoRouter.mjs";
import completedVideoRouter from "./completedVideoRouter.mjs";
import completedSubRouter from "./completedSubRouter.mjs";
import subtaskRoutes from "./subtaskRoutes.mjs";

const rootRouter = Router();

// Root route for checking rootRouter status
rootRouter.get("/", (_req, res) => {
    res.send({ message: "Root router is running" });
});

//router
rootRouter.use('/admin', adminRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/videos",videoRouter);
rootRouter.use("/completed-videos", completedVideoRouter);
rootRouter.use("/completed-sub",completedSubRouter);
rootRouter.use("/subtasks", subtaskRoutes);

export default rootRouter;