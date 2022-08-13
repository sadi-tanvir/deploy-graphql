import mongoose from "mongoose"
import dotenv from "dotenv"
if (process.env.NODE_ENV != 'production') {
    dotenv.config()
}

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.jnizw.mongodb.net/${process.env.MONGO_USER}?retryWrites=true&w=majority`

// mongodb connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(error => console.log(error))