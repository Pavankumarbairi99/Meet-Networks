const express = require("express");
const validator = require("validator")
const authrouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");
const { userAuth } = require("../Middleware/auth");
const upload = require("../utils/multer");
const uploadImageCloudinary = require("../utils/uploadImageCloudinary");

let userSharedData = "firstName lastName age gender about skills photoUrl";


authrouter.put("/upload-image", upload.single('image'), async(req, res) => {
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
    // Signup route
authrouter.post("/signup", async(req, res) => {
    try {
        let { firstName, lastName, emailId, password, photoUrl } = req.body;
        if (!emailId || !firstName || !password || !photoUrl) {
            return res.status(500).json({
                message: "Provide Requied Fields"
            })
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(500).json({ message: ("Password Must Strong [@,Uppercase,lowercase]") })
        }
        let checkemail = await User.findOne({ emailId });
        if (checkemail) {
            return res.status(500).send("User already Registered");
        }

        // Hash password
        let passwordHash = await bcrypt.hash(password, 10);


        let userdata = {
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            photoUrl: photoUrl
        };

        // Save user
        let user = new User(userdata);
        await user.save();

        return res.json({
            message: `${firstName}, your account is Successfully Registered`,
            user,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).send("Connection failed: " + err.message);
    }
});

// Login route
authrouter.post("/login", async(req, res) => {
    try {
        let { emailId, password } = req.body;
        let user = await User.findOne({ emailId: emailId });

        if (!user) {
            return res.status(404).send("Invalid Credentials");
        }

        let passwordCheck = await user.passwordValidate(password);
        if (!passwordCheck) {
            return res.status(404).send("Invalid Credentials");
        }

        const token = await user.getJwt();
        res.cookie("token", token);

        return res.json({
            message: `${user?.firstName} Logined`,
            data: user
        });
    } catch (err) {
        res.status(400).json({ message: "Something went wrong: " + err.message });
    }
});

// Logout route
authrouter.post("/logout", userAuth, async(req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    return res.json({ message: `${req.user.firstName} has logged out` });
});


module.exports = authrouter