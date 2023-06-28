const { createBooking, getSingleBooking, getAllBooking, destroyBooking } = require('../controllers/BookingController')
const express = require('express')
const { authProtected } = require('../middlewares/auth')
const router = express.Router()

router
    .post("/book", authProtected, createBooking)
    .get("/", getAllBooking)
    .get("/single-book/:id", getSingleBooking)
    .delete("/destroy", destroyBooking)

module.exports = router