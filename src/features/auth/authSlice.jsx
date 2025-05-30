import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,

    },
    reducers: {
        setCredentials: (state, action) => {
            const { access_token } = action.payload;
            state.token = access_token;
        },
        logOut: (state) => {
            state.token = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;

