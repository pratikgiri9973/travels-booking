const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true
        },
        userEmail: {
            type: String,
        },
        tourName: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        guests: {
            type: Number,
        },
        phone: {
            type: Number,
            required: true
        },
        bookingDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "confirm", "reject", "complete"],
            default:"pending"
        }
    },
    { timestamps: true }
)



module.exports = mongoose.model("booking", bookingSchema)