import { Router } from "express";
import adminRouter from "./admin.mjs";
import userRouter from "./user.mjs";
import videoRouter from "./videoRouter.mjs";



const rootRouter = Router();

rootRouter.get('/', (req, res) => {
    res.send({message : `root router running`});
});

//router
rootRouter.use('/admin', adminRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/videos",videoRouter);

export default rootRouter;