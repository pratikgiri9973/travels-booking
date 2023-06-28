const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You are not authorize"
        })
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }
        req.user = user
        next()
    })
}

exports.verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.role === "admin") {
            next()
        } else {
            return res.status(401).json({
                success: false,
                message: "You are not authenticated"
            })
        }
    })
}


exports.verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.role === "admin") {
            next()
        } else {
            return res.status(401).json({
                success: false,
                message: "You are not authorize"
            })
        }
    })
}