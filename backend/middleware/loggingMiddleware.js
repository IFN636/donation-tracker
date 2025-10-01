import logger from "../utils/logger.js";
const loggingMiddleware = async (req, res, next) => {
    const start = Date.now();

    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);

    res.on("finish", () => {
        const duration = Date.now() - start;
        logger.info(
            `Response: ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`
        );
    });

    return await next();
};

export default loggingMiddleware;