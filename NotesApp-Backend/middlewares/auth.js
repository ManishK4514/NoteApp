const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({
            message: "Access denied. No token provided."
        });
    }

    jwt.verify(token, "Manish", (err, decode) => {
        if (err) {
            return res.status(401).send({
                message: "Token is not valid. Please login."
            });
        }

        if (decode) {
            req.body.user = decode.userId;
            next();
        } else {
            res.status(401).send({
                message: "Token is not valid. Please login."
            });
        }
    });
}

module.exports = {auth}
