import { Router } from "express";
import { body, matchedData, validationResult } from "express-validator";
import DB from "../db/db.mjs";

const adminRouter = Router();

adminRouter.get('/', (req, res) => {
    res.status(200).json({ message: `admin router running...` });
});

//admin save
adminRouter.post('/save_admin',

    // body('name').trim().notEmpty().withMessage('name is empty!'),
    body('email').trim().isEmail().withMessage('not an email!'),
    body('password').trim().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    }),
    body('role').notEmpty().withMessage('role is empty!')

    , async (req, res) => {

        try {

            const result_validation = validationResult(req);
            const match_data = matchedData(req);

            if (result_validation.isEmpty()) {

                const save_admin = await DB.admin.create({ data: match_data });

                if (!save_admin) {
                    return res.status(400).json({ message: "admin not save!" });
                }

                return res.status(200).json({ message: "admin save", admin: save_admin });

            }

            return res.status(404).json({message : result_validation});



        } catch (error) {

            console.log(error);
            return res.status(500).json({ error: error, message: 'Internal sever Error!' })

        }


    }
)


export default adminRouter;