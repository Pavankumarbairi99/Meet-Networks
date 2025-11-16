const express = require("express")
const userRouter = express()
const { userAuth } = require("../Middleware/auth")
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")
let userSharedData = "firstName lastName age gender about skills photoUrl"
userRouter.get("/user/request/received", userAuth, async(req, res) => {
    try {
        let logginedUser = req.user;
        const requestReceived = await ConnectionRequest.find({
            toUserId: logginedUser._id,
            status: "interested"
        }).populate("fromUserId", userSharedData)
        res.json({
            message: `Your Request list`,
            data: requestReceived
        })
    } catch (err) {
        res.status(400).send("Error " + err.message)
    }


})

userRouter.get("/user/connections", userAuth, async(req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        let logginedUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [{
                    fromUserId: logginedUser._id,
                    status: "accepted"
                },
                {
                    toUserId: logginedUser._id,
                    status: "accepted"
                }
            ]

        }).populate("fromUserId", userSharedData).populate("toUserId", userSharedData)
        const data = connectionRequests.map(row => {
            if (row.fromUserId._id.toString() === logginedUser._id.toString()) {
                return row.toUserId
            }
            return row.fromUserId
        })
        res.json({
            data
        })
    } catch (err) {
        res.status(400).send(err.message)
    }
})
userRouter.get("/feeds", userAuth, async(req, res) => {
    try {
        let page = parseInt(req.query.page)
        let limite = parseInt(req.query.limite);
        let skip = (page - 1) * limite | 0;

        let logginedUser = req.user
        const userrequest = await ConnectionRequest.find({
            $or: [{ fromUserId: logginedUser._id }, { toUserId: logginedUser._id }],

        }).select("fromUserId toUserId")
        const hiddenUser = new Set();
        userrequest.forEach(element => {
            hiddenUser.add(element.fromUserId.toString())
            hiddenUser.add(element.toUserId.toString())
        });
        let data = await User.find({
            $and: [{
                _id: { $nin: Array.from(hiddenUser) }
            }, {
                _id: { $ne: logginedUser._id }
            }]
        }).select(userSharedData).skip(skip).limit(limite)
        res.send(data)
    } catch (err) {
        res.send("Error")
    }
})
module.exports = userRouter