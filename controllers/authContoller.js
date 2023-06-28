const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { OAuth2Client } = require("google-auth-library")

exports.register = async (req, res) => {
    try {
        const { password, email } = req.body
        const found = await User.findOne({ email })
        if (found) {
            return res.status(400).json({
                message: "email already exist"
            })
        }
        const hashPass = bcrypt.hashSync(password, 10)
        const result = await User.create({ ...req.body, password: hashPass, role: "user" })
        res.json({
            message: "user register success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to registered, Try again",

        })
    }
}



exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        console.log(user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }
        const checkCorrectPassword = await bcrypt.compareSync(password, user.password)
        if (!checkCorrectPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_KEY)
        res.cookie("token", token)

        res.status(200).json({
            success: true,
            message: "Successfully login",
            result: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to login"
        })
    }
}

