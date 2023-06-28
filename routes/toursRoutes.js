const { createTour, updateTour, deleteTour, getSingleTour, getAllTour, getTourBySearch, getFeaturedTour, getTourCount, destroytour } = require("../controllers/tourController")

const express = require('express')
const { verifyAdmin } = require("../utils/VerifyToken")

const router = express.Router()

router
  .post('/add-tour', createTour)
  .put('/update/:tourId', updateTour)
  .delete('/delete/:id', deleteTour)
  .get('/:id', getSingleTour)
  .get('/', getAllTour)
  .get('/search/getTourBySearch', getTourBySearch)
  .get('/search/getFeaturedTour', getFeaturedTour)
  .get('/search/getTourCount', getTourCount)
  .delete('/', destroytour)

module.exports = router