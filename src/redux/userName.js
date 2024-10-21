import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  username: "",	
};

export const usernameSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    cleanUsername: (state) => {
      state.username = "";
    },
  },
});
export const { setUsername, cleanUsername } = usernameSlice.actions;
export default usernameSlice.reducer;
