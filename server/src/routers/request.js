const express = require("express")
const request = express()
const ConnectionRequest = require("../models/connectionRequest")
const { userAuth } = require("../Middleware/auth")
const User = require("../models/user")

request.post("/request/send/:status/:userId", userAuth, async(req, res) => {
    try {
        let fromUserId = req.user._id;
        let toUserId = req.params.userId;
        const status = req.params.status

        let allowStatus = ["interested", "ignore"]
        if (!allowStatus.includes(status)) {
            throw new Error("Invailde Status Type")
        }
        let existConnectionRequest = await ConnectionRequest.findOne({
            $or: [{
                    fromUserId,
                    toUserId
                },
                {
                    fromUserId: toUserId,
                    toUserId: fromUserId
                }
            ]
        });
        let touser = await User.findById(toUserId)
        if (!touser) {
            throw new Error("User Dosn't Exist")
        }
        if (existConnectionRequest) {
            throw new Error(`${req.user.firstName} is Alread send Request to ${touser.firstName}`)
        }
        const connectionRequest = new ConnectionRequest({ fromUserId, toUserId, status })
        const data = await connectionRequest.save()
        res.json({
            message: `${req.user.firstName}, send ${status} Connection to ${touser.firstName}`,
            data
        })
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }

})
request.post("/request/review/:status/:requestId", userAuth, async(req, res) => {
    try {
        let logginedUser = req.user._id;
        let { status, requestId } = req.params;
        const isAllowsStatus = ["accepted", "rejected"];
        if (!isAllowsStatus.includes(status)) {
            throw new Error("Status Id is not Vailde")
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: logginedUser,
            status: "interested"
        })
        if (!connectionRequest) {
            throw new Error("Request is not Found")
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save()
        res.json({
            message: `you ${status} a Connection Request`,
            data
        })
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }

})
module.exports = request;