import { Router } from "express";
import adminRouter from "./admin.mjs";
import authRouter from "./auth.mjs";

const rootRouter = Router();

rootRouter.get('/', (req, res) => {
    res.send({message : `root router running`});
});

//router
rootRouter.use('/admin', adminRouter);
rootRouter.use("/auth", authRouter);


export default rootRouter;