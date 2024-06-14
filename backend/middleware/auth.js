import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    // Extract token from request headers
    const token = req.headers.token;

    // Check if token is missing
    if (!token) {
        return res.status(401).json({ success: false, message: "Authorization token is missing" });
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID from decoded token to request body
        req.body.userId = decodedToken.id;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Handle token verification errors
        console.error("Token verification error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authMiddleware;
