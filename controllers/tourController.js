const Tour = require('./../models/Tour')

exports.createTour = async (req, res) => {

    console.log(req.body)
    try {
        const result = await Tour.create(req.body)
         res.status(200).json({
            success: true,
            message: "Succesfully created",
            data: result
        })
    } catch (error) {
        console.log(error);
         res.status(400).json({
            error,
            success: false,
            message: "Failed to create, Try again",

        })
    }
}


exports.updateTour = async (req, res) => {
    const id = req.params.tourId
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id,
            req.body
            , { new: true })
         res.status(200).json({
            success: true,
            message: "Succesfully updated",
            data: updatedTour
        })

        console.log(updatedTour)
    } catch (error) {
        console.log(error);
         res.status(400).json({
            success: false,
            message: "Failed to update, Try again",

        })
    }
}


exports.deleteTour = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Tour.findByIdAndDelete(id)
         res.status(200).json({
            success: true,
            message: "Succesfully deleted",

        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: "Failed to delete, Try again",

        })
    }
}


exports.getSingleTour = async (req, res) => {
    const id = req.params.id
    try {
        const tour = await Tour.findById(id).populate('reviews')
         res.status(200).json({
            success: true,
            message: "Succesfully find single tour",
            data: tour
        })
    } catch (error) {
         res.status(404).json({
            success: false,
            message: "not found",

        })
    }
}


exports.getAllTour = async (req, res) => {
    try {
        const tours = await Tour.find()
         res.status(200).json({
            success: true,
            message: "Succesfully find all tour",
            data: tours
        })
    } catch (error) {
        console.log(error)
         res.status(404).json({
            success: false,
            message: "not found",

        })
    }
}


exports.getTourBySearch = async (req, res) => {
    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)
    try {
        const tours = await Tour.find({ city, distance: { $gte: distance }, maxGroupSize: { $gte: maxGroupSize } }).populate('reviews')
        res.status(200).json({
            success: true,
            message: "Succesfully search",
            data: tours
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "not found",

        })
    }
}

exports.getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true })

        res.status(200).json({
            success: true,
            count: tours.length,
            message: "Succesfully featured all tour",
            data: tours
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "not found",

        })
    }
}


exports.getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount()
         res.status(200).json({ success: true, data: tourCount })
    } catch (error) {
         res.status(500).json({ success: false, message: "failed to fetch " })
    }
}

exports.destroytour = async (req, res) => {
    try {
        const result = await Tour.deleteMany()
        res.json({
            message: "Tour destroy Successfully",
            result
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Error" + error
        })
    }
}

