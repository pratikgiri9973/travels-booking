const mongoose = require('mongoose')
const tourSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            // required: true,
            // unique: true
        },
        city: {
            type: String,
        },
        address: {
            type: String,
        },
        distance: {
            type: String,
        },
        photo: {
            type: String,
            // required: true
        },
        desc: {
            type: String,
            // required: true
        },
        price: {
            type: Number,
            // required: true
        },
        maxGroupSize: {
            type: Number,

        },
        publish: {
            type: Boolean,
            default: true
        },
        reviews: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Review"
            },
        ],

    },
    { timestamps: true }
)

module.exports = mongoose.model("tours", tourSchema)