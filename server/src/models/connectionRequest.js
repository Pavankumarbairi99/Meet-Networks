const mongoose = require("mongoose");

const requestConntectionSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    status: {
        type: String,
        enum: {
            values: ["accepted", "interested", "rejected", "ignore"],
            message: "{VALUE} incorrect Status Type"
        }
    },

}, {
    timestamps: true
})

requestConntectionSchema.pre("save", function(next) {
    requests = this;
    if (requests.fromUserId.equals(requests.toUserId)) {
        throw new Error("Cann't send request to Your Slef.")
    }
    next()
})


const ConnectionRequest = new mongoose.model("connectionRequest", requestConntectionSchema)
module.exports = ConnectionRequest