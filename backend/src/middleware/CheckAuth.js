const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token;
 
    if (!token) {
        return res.status(400).json({
            message: "Token was not available"
        });
    } else {
        jwt.verify(token, 'tokenkey', (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Token authentication failed, not autherised"
                });
            } else {
                req.user = decoded; // assuming you want to store the decoded token data in req.user
                next();
            }
        });
    }
};
