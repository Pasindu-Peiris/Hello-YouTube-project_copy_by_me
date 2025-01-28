import { validationResult } from "express-validator";

export const validateRequest = (validations) => async (req, res, next) => {
  console.log("Middleware execution started:", req.method, req.originalUrl);
  console.log("Request payload:", req.body || req.query);

  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors found:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("Middleware execution completed successfully");
  next();
};
