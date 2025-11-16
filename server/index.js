const express = require("express");
const { serverdb } = require("./src/config/dataBase");
const User = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))

app.use(express.json());
app.use(cookieParser())

const authrouter = require("./src/routers/authRouter")
const profileRouter = require("./src/routers/profile")
const requestRouter = require("./src/routers/request")
const userRouter = require("./src/routers/userRouter")
app.use("/", authrouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)


serverdb().then(() => {
    console.log("Conntect Sucessfully to MongoDB")
    app.listen(7000, () => {
        console.log("You Connected to LocalHost:7000 Server")
    })
}).catch((err) => {
    console.error("Connection Failed " + err)
})
