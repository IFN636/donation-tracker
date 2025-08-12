import { body } from "express-validator";

export const registerValidation = [
    body("name")
        .trim()
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .matches(/[A-Z]/)
        .withMessage("Password needs at least 1 uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password needs at least 1 lowercase letter")
        .matches(/\d/)
        .withMessage("Password needs at least 1 number"),
];

export const loginValidation = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .matches(/[A-Z]/)
        .withMessage("Password needs at least 1 uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password needs at least 1 lowercase letter")
        .matches(/\d/)
        .withMessage("Password needs at least 1 number"),
];
