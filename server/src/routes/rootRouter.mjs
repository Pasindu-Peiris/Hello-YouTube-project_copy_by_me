import { Router } from "express";
import adminRouter from "./admin.mjs";
import userRouter from "./user.mjs";

const rootRouter = Router();

rootRouter.get('/', (req, res) => {
    res.send({message : `root router running`});
});

//router
rootRouter.use('/admin', adminRouter);
rootRouter.use("/user", userRouter);


export default rootRouter;