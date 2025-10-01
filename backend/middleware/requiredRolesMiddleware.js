const requiredRoles = (...roles) => {
    return async (req, res, next) => {
        try {
            if (!req.user || !roles.includes(req.user.role)) {
                return res.status(403).json({
                    status: "error",
                    message: "Access denied",
                });
            }
            return await next();
        } catch (err) {
            return next(err);
        }
    };
};

export default requiredRoles;