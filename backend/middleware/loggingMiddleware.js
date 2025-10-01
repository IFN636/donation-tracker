import logger from "../utils/logger.js";

function loggingMiddleware(req, res, next) {
    const start = Date.now();

    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);

    res.on("finish", () => {
        const duration = Date.now() - start;
        logger.info(
            `Response: ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`
        );
    });

    next();
}

export default loggingMiddleware;