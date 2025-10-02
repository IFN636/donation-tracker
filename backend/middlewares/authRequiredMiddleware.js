import User from "../models/User.js";
import { JwtUtils } from "../utils/security.js";
export const authRequired = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ') 
            ? authHeader.slice(7) 
            : req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                error: 'Authentication required' 
            });
        }
        
        const decoded = JwtUtils.verifyToken(token);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user || !user.isActive) {
            return res.status(403).json({ 
                success: false, 
                error: 'Account not found or inactive' 
            });
        }
        
        req.user = { id: user._id, email: user.email, role: user.role };
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ 
            success: false, 
            error: 'Authentication failed',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export default authRequired;
