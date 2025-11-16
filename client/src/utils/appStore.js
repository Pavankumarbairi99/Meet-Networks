import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import UserFeeds from "./feedSlice"
import connectionReducer from "./connectionSlice"
import requestReducer from "./RequestSlice"
const appStore = configureStore({
    reducer: {
        user: userReducer,
        feeds: UserFeeds,
        connection: connectionReducer,
        request: requestReducer
    }
})
export default appStore