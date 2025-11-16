const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose')

const serverdb = async() => {
    await mongoose.connect(process.env.FRONTEND_URL)
}

module.exports = { serverdb }