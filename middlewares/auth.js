const jwt = require("jsonwebtoken")
exports.authProtected = (req, res, next) => {
    if (!req.cookies) {
        return res.status(401).json({
            message: "No Cookie Found"
        })
    }
    const { token } = req.cookies
    console.log(token);
    if (!token) {
        return res.status(401).json({
            message: "token missing"
        })
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({
                message: "invalid token"
            })
        }
        const { id, role } = decode

        req.body.userId = id
        req.body.role = role
        next()
    })
}