const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            // required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
        },
        photo: {
            type: String
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        active: {
            type: Boolean,
            default: true
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
    },
    { timestamps: true }
)
module.exports = mongoose.model("User", userSchema)