import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice"
import userStateSlice from "../features/user/userstateSlice"
import tourStateSlice  from "../features/tour/TourStateSlice";
// import socketMiddleware from "../features/Socket/SocketMiddleware";


export const store = configureStore({
    reducer: {
        [ apiSlice.reducerPath ]: apiSlice.reducer,
        auth: authReducer,
        userState: userStateSlice,
        tourState: tourStateSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);
