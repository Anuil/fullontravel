import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  user: null,
};

const userStateSlice = createSlice({
  name: "userStatesManager",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userStateSlice.actions;

export const useUserState = () => {
  const dispatch = useDispatch();
  const  user  = useSelector((state) => state.userState.user);

  const setUserHandler = (value) => dispatch(setUser(value));

  return {
    user,
    setUserHandler,
  };
};

export default userStateSlice.reducer;
