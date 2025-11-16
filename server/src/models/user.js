const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 4,
        maxLength: 20,
        required: true,
        trim: true

    },
    lastName: {
        type: String
    },

    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                return res.status(404).send("invalid EmailID " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Your Password is Week add Strong Password")
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other", "Male", 'Female', "Other"],
            message: '{VALUE} Gender is Not Vaild, give vaild Gender'
        }


    },
    photoUrl: {
        type: String,
        required: true,
        validate(value) {
            if (!value || value.trim().length === 0) {
                throw new Error("Photo path is required");
            }
        },
        default: "/uploads/images/default.jpg"
    },

    skills: {
        type: [String],
        maxLength: 10
    },
    about: {
        type: String,
        default: "Hey I'm using the DevTinder App."
    }
}, {
    timestamps: true
})

userschema.methods.getJwt = async function() {
    let user = this;
    const token = await jwt.sign({ _id: user._id }, "TinderClone#9980p", { expiresIn: "1d" })
    return token
}
userschema.methods.passwordValidate = async function(userinputPassword) {
    let user = this;
    const isPosswordValide = await bcrypt.compare(userinputPassword, user.password)
    return isPosswordValide;
}

module.exports = mongoose.model("users", userschema)