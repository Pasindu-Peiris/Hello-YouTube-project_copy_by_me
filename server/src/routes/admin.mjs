import { Router } from "express";

const adminRouter = Router();

adminRouter.get('/admin', async (req, res) => {
    res.status(200).json({ message: "admin router is working ..." })
})



export default adminRouter;