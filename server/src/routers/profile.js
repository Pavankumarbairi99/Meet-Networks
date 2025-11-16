const express = require("express")
const profileRouter = express()
const User = require("../models/user");
const { userAuth } = require("../Middleware/auth")
const { updateValidation, passwordChecks } = require("../utils/validation")
const bcrypt = require("bcrypt")
const multer = require("multer")
const path = require("path");
const uploadImageCloudinary = require("../utils/uploadImageCloudinary");
const upload = require("../utils/multer");
// profileRouter.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// const storage = multer.diskStorage({
//     destination: path.join(__dirname, "../uploads/images"),
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });

// const upload = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//         const extNames = /jpeg|jpg|png/;
//         const isValid = extNames.test(path.extname(file.originalname).toLowerCase());
//         if (isValid) {
//             return cb(null, true);
//         } else {
//             return cb(new Error("Invalid image type"));
//         }
//     },
// });

profileRouter.put("/upload-image", userAuth, upload.single('image'), async(req, res) => {
    try {
        const file = req.file
        const CloudinaryUrl = await uploadImageCloudinary(file)
        return res.json({
            message: "Upload Successfully",
            data: CloudinaryUrl.url
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})
profileRouter.get("/profile", userAuth, async(req, res) => {
    try {
        let profile = req.user;

        res.send(profile)

    } catch (err) {
        res.status(400).send("something went worng " + err.message)
    }

})

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
    try {
        let a = updateValidation(req)

        if (!updateValidation(req)) {
            throw new Error("Invalide Update details")
        }
        let loginedUser = req.user;
        Object.keys(req.body).forEach(key => loginedUser[key] = req.body[key])
        await loginedUser.save()
        res.json({
            message: "Profile Updated",
            data: loginedUser
        })
    } catch (err) {
        res.status(550).send("Error: " + err.message)
    }
})

profileRouter.post("/profile/changepassword", userAuth, async(req, res) => {
    try {
        if (!passwordChecks(req)) {
            throw new Error("Invalide Details")
        }
        let user = req.user;
        let loggineduser = req.user;
        const ispasswordverfiy = await user.passwordValidate(req.body.oldpassword)
        if (!ispasswordverfiy) {
            throw new Error("incorrect Password")
        }
        const passswordhash = await bcrypt.hash(req.body.newpassword, 10)
        loggineduser.password = passswordhash;
        await loggineduser.save()
        res.send(`${loggineduser.firstName}, your Password as Changed`)
    } catch (err) {
        res.status(400).send("Error " + err.message)
    }

})
module.exports = profileRouter