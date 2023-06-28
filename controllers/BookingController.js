const Booking = require("../models/Booking")
const Tour = require("../models/Tour")


exports.createBooking = async (req, res) => {
    try {
        const result = await Booking.create({
            ...req.body,
            bookingDate: new Date(`${req.body.date}`)
        })
          res.json({
            message: "Tour Book success", result
        })
    } catch (error) {
         res.status(200).json({
            success: false,
            message: "Not found",
        })
    }

}
exports.getSingleBooking = async (req, res) => {
    // const id = req.params._id
    console.log(req.params);
    try {
        const result = await Tour.findById(req.params.id)
        res.status(200).json({
            success: true,
            message: "Successfully single fetched ",
            data: result
        })
    } catch (error) {
        console.log(error);
         res.status(200).json({
            success: false,
            message: "Not found",
        })
    }
}
exports.getAllBooking = async (req, res) => {
    try {
        const result = await Booking.find()
         res.status(200).json({
            success: true,
            message: "Successfully fetched ",
            data: result
        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: "Not found",
        })
    }
}
exports.destroyBooking = async (req, res) => {
    try {
        const result = await Booking.deleteMany()
        res.status(200).json({
            success: true,
            message: "Successfully fetched ",
            data: result
        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: "Not found",
        })
    }
}

