import { Router } from "express";
import DB from "../db/db.mjs";
import { body, param, validationResult, matchedData } from "express-validator";

const contactUs = Router();

//create 
contactUs.post('/add-message',

    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('message').notEmpty().withMessage('Message is required'),

    async (req, res) => {

        const validate_result = validationResult(req);

        try {

            if (validate_result.isEmpty()) {

                const matched_data = matchedData(req);

                const contactus = await DB.contactus.create({ data: matched_data });

                if (!contactus) {
                    return res.status(404).json({ success: false, message: "Message not created" });
                }

                return res.status(201).json({ success: true, message: "Message created successfully", contactus: contactus });

            } else {
                return res.status(404).json({ success: false, message: validate_result });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error" });

        }

    }
);

//get
contactUs.get('/get-messages', async (_, res) => {

    try {

        const contactus = await DB.contactus.findMany();

        if (!contactus) {
            return res.status(404).json({ success: false, message: "Messages not found" });
        }

        return res.status(200).json({ success: true, contactus: contactus });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });

    }

});

//delete by id
contactUs.delete('/delete-message/:id',

    param('id').notEmpty().withMessage('Id is required'),

    async (req, res) => {

        const validate_result = validationResult(req);

        try {

            if (validate_result.isEmpty()) {
                const deleteContact = await DB.contactus.delete({ where: { id: parseInt(req.params.id) } });

                if (!deleteContact) {
                    return res.status(404).json({ success: false, message: "Message not deleted" });
                }

                return res.status(200).json({ success: true, message: "Message deleted successfully" });
            } else {
                return res.status(404).json({ success: false, message: validate_result });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }

    }

)




export default contactUs;