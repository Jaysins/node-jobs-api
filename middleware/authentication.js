const {UnauthenticatedError} = require("../errors");
const jwt = require("jsonwebtoken")

const authenticationMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization || !authorization.split("Bearer ")) {
        throw new UnauthenticatedError("invalid auth token")
    }
    const token = authorization.split(" ")[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId, name: payload.name }
        next();
    } catch (error) {
        throw new UnauthenticatedError("Invalid token")
    }
}

module.exports = authenticationMiddleware