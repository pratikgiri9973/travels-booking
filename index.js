const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const tourRoute = require('./routes/toursRoutes')
const userRoute = require('./routes/userRoutes')
const authRoute = require('./routes/authroutes')
const bookingRoute = require('./routes/bookingsRoutes')
const path = require("path")


dotenv.config()
const app = express()
app.use(express.static("public"))
const port = process.env.PORT || 5000
app.use(cors({
    credentials: true,
    origin: "https://rich-gray-capybara-sock.cyclic.app"
}))



mongoose.set('strictQuery', false)
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            usenewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("MongoDB Database Connected");
    } catch (error) {
        console.log("MongoDB Database Connected Failed");
    }
}


app.use(express.json())

app.use(cookieParser())

app.use('/tours', tourRoute)
app.use('/users', userRoute)
app.use('/auth', authRoute)
app.use('/booking', bookingRoute)

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})
app.listen(port, () => {
    connect()
    console.log('server listening on port', port);
})

