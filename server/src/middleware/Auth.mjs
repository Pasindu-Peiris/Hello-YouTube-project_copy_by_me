import jwt from "jsonwebtoken";

// Middleware to verify JWT
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded; // Add decoded token data (e.g., userID) to `req.user`
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

// Middleware to check for admin role
export const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); // User is an admin, proceed
    } else {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
};

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
};
