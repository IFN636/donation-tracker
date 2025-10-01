import { validationResult } from "express-validator";

const validationMiddleware = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const validationErrors = errors.array().map((error) => ({
                field: error.type === "field" ? error.path : "unknown",
                message: error.msg,
            }));
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                validationErrors,
                errorType: "validation",
            });
        }
        return await next();
    } catch (error) {
        return next(error);
    }
};

export default validationMiddleware;