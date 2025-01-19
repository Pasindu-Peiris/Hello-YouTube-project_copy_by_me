import { Router } from "express";
import adminRouter from "./admin.mjs";

const rootRouter = Router();

rootRouter.get('/', (req, res) => {
    res.send({message : `root router running`});
});

//router
rootRouter.use('/admin', adminRouter);


export default rootRouter;