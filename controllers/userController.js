const User = require('./../models/User')

exports.createUser = async (req, res) => {
    const newUser = new User(req.body)
    try {
        const savedUser = await newUser.save()
        res.status(200).json({
            success: true,
            message: "Succesfully created",
            data: savedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create, Try again",

        })
    }
}


exports.updateUser = async (req, res) => {
    const id = req.params.id
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body , { new: true })
        if (!updatedUser) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }
        res.status(200).json({
            success: true,
            message: "Succesfully updated",
            data: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update, Try again",

        })
    }
}


exports.deleteUser = async (req, res) => {
    const id = req.params.id
    try {
       const result = await User.findByIdAndDelete(id)
       if (!result) {
        return res.status(400).json({
            message: "Invalid Id"
        })
    }
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


exports.getSingleUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }
        res.status(200).json({
            success: true,
            message: "Succesfully find single User",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "not found",

        })
    }
}


exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find()
        console.log(users)
        res.status(200).json({
            success: true,
            message: "Succesfully find all User",
            data: users
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "not found",

        })
    }
}


exports.getUserBySearch = async (req, res) => {
    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)
    try {
        const Users = await User.find({ city, distance: { $gte: distance }, maxGroupSize: { $gte: maxGroupSize } })
        res.status(200).json({
            success: true,
            message: "Succesfully search",
            data: Users
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "not found",

        })
    }
}

exports.getFeaturedUser = async (req, res) => {
    try {
        const Users = await User.find({ featured: true })
        res.status(200).json({
            success: true,
            count: Users.length,
            message: "Succesfully featured all User",
            data: Users
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "not found",

        })
    }
}

exports.destroyUser = async (req, res) => {
    try {
        const result = await User.deleteMany()
        res.json({
            message: "User destroy Successfully",
            result
        })
    } catch (error) {
        console.log("UserController.js => destroyUser");
        console.log(error);
        res.status(400).json({
            message: "Error" + error
        })
    }
}

exports.handleAccount = async (req, res) => {
    const { id } = req.params
   try {
    const result = await User.findByIdAndUpdate(id, { active: req.body.active }, { new: true })
    res.json({
        message: "account block/unblock success",
        result
    })
   } catch (error) {
    console.log("UserController.js =>handleAccount ");
        console.log(error);
        res.status(400).json({
            message: "Error" + error
        })
   }
}