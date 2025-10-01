function loggingMiddleware(req, res, next) {
    const start = Date.now();

    console.log(`[REQ] ${req.method} ${req.originalUrl}`, {
        user: req.user?.id || "guest",
        body: req.body,
    });

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`[RES] ${req.method} ${req.originalUrl}`, {
            status: res.statusCode,
            duration: duration + "ms",
        });
    });

    next();
}

export default loggingMiddleware;