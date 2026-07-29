import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
dotenv.config();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({ errors: errors.array() });
};

export const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email format"),
  body("password").custom((value) => {
    if (process.env.ENVIRONMENT === "production") {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/
      if (!passwordRegex.test(value)) {
        throw new Error("Password must contain at least one uppercase letter and one number");
      }
    }
    if (value.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    return true;
  }),
  validate,
];

export const registerValidation = [
  body("user").isString().isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters long"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email format"),
  body("password").custom((value) => {
    if (process.env.ENVIRONMENT === "production") {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/
      if (!passwordRegex.test(value)) {
        throw new Error("Password must contain at least one uppercase letter and one number");
      }
    }
    if (value.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    return true;
  }),
  validate,
];