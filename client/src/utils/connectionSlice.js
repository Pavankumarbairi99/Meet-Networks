import { createSlice } from "@reduxjs/toolkit"

const connections = createSlice({
    name: "connection",
    initialState: null,
    reducers: {
        addConnection: (state, action) => {
            return action.payload
        },
        removeConnection: () => {
            return null
        }
    }
})
export const { addConnection, removeConnection } = connections.actions;
export default connections.reducer