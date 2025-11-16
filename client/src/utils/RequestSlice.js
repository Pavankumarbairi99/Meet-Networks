import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequestList: (state, action) => {
            return action.payload;
        },
        removeRequest: (state, action) => {
            const newData = state.filter(req => req._id !== action.payload)
            return state = newData;
        }
    }
})
export const { addRequestList, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;