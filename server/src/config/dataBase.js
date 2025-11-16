const mongoose = require('mongoose')

const serverdb = async() => {
    await mongoose.connect("mongodb+srv://pawanbairy:W7qJHN9DAtpxgDGm@nodedemo.76xiyks.mongodb.net/TinderClone")
}

module.exports = { serverdb }