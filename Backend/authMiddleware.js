const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);  // Debugging output

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]
        console.log('Extracted Token:', token);  // Debugging output

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("JWT verification error:", err);
                // Check if the token has expired
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "Session expired, please log in again", expiredAt: err.expiredAt });
                } else {
                    return res.status(403).json({ message: "Invalid token", error: err.name });
                }
            }
            console.log('Decoded JWT:', decoded);  // Debugging output
            req.user = decoded;
            next();
        });
    } else {
        return res.status(401).json({ message: "No token provided or token malformatted" });
    }
};

module.exports = authenticateToken;
