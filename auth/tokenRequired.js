const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({
                    Error:
                        "The token is not valid. Please provide the correct token information in the headers.",
                });
            } else {
                res.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({
            Error: "Please provide credentials to access this resource.",
        });
    }
};
