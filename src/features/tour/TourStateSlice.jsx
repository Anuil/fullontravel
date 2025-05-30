import { createSlice } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";


const initialState = {
    tourData: null,
    tourDateData : null
}



const tourStateSlice = createSlice({
    name: "TourStatesManager",
    initialState,
    reducers: {
        setTourData: (state, action) => {
            state.tourData = action.payload;
        },
        setTourDateData: (state, action) => {
            state.tourDateData = action.payload;
        }
    },
});

export const { setTourData } = tourStateSlice.actions;
export const { setTourDateData } = tourStateSlice.actions;


export const useTourState = () => {
    const dispatch  = useDispatch()
    const { tourData, tourDateData } = useSelector((state) => state.tourState);

    const setTourDataFunc = (data) => {
        dispatch(setTourData(data))
    }
    const setTourDateDataFunc = (data) => {
        dispatch(setTourDateData(data))
    }

    return {
        tourData, 
        setTourDataFunc,

        tourDateData,
        setTourDateDataFunc
    }
}

export default tourStateSlice.reducer;