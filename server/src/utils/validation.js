const User = require("../models/user")
const bcrypt = require("bcrypt")

let loginValidation = async(req) => {
    let { emailId, password } = req.body;
    let findprofile = await User.findOne({ emailId: emailId })

    if (!findprofile) {
        throw new Error("Invalid Credentials")
    }
    let passwordCheck = await bcrypt.compare(password, findprofile.password)

    if (passwordCheck) {
        return true
    }
}

let updateValidation = (req) => {
    const isAllows = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"]
    const isValide = Object.keys(req.body).every(felid => isAllows.includes(felid))
    return isValide
}

let passwordChecks = (req) => {
    const allows = ["oldpassword", "newpassword"]
    let ispasswordvalide = Object.keys(req.body).every(key => allows.includes(key));
    return ispasswordvalide
}
module.exports = {
    loginValidation,
    updateValidation,
    passwordChecks
}