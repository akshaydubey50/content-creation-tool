import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    isUserAuthenticated: false,
  },
  reducers: {
    setUserAuth: (state, action) => {
      state.isUserAuthenticated = action.payload;
    },
  },
});

export const { setUserSession, setUserAuth } = userSlice.actions;

export default userSlice.reducer;
