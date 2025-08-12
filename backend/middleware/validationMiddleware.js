import { validationResult } from "express-validator";

export const validationMiddleware = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const validationErrors = errors.array().map((error) => ({
            field: error.type === "field" ? error.path : "unknown",
            message: error.msg,
        }));

        res.status(400).json({
            success: false,
            message: "Validation failed",
            validationErrors,
            errorType: "validation",
        });
        return;
    }

    next();
};
