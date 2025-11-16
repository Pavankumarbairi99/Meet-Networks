import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feeds",
    initialState: null,
    reducers: {
        addFeeds: (state, action) => {
            return action.payload
        },
        removeFeeds: (state, action) => {
            const newData = state.filter(user => user._id !== action.payload)
            return newData
        },
        clearFeeds: () => {
            return null
        }
    }
})

export const { addFeeds, removeFeeds, clearFeeds } = feedSlice.actions;
export default feedSlice.reducer