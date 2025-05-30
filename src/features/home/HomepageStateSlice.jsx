import { createSlice } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";


const initialState = {
    baseSlug: "-tour-packages",
}



const homeStateSlice = createSlice({
    name: "HomeStatesManager",
    initialState,
    reducers: {
        setSlugData: (state, action) => {
            state.baseSlug = action.payload;
        },
    },
});

export const { setSlugData } = homeStateSlice.actions;


export const useHomeState = () => {
    const dispatch = useDispatch()
    const { baseSlug } = useSelector((state) => state.HomeStatesManager)

    const setHomeDataFunc = (data) => {
        dispatch(setSlugData(data))
    }

    return {
        baseSlug,
        setHomeDataFunc
    }
}

export default homeStateSlice.reducer;