import { createSlice } from "@reduxjs/toolkit";

const verifiedSlice = createSlice({
  name: "verified",
  initialState: {
    verifiedData: [],
    isVerifiedCheck: false,
  },
  reducers: {
    setProductVerifiedData: (state, action) => {
      state.verifiedData = action.payload;
    },
    clearProductVerifiedData: (state) => {
      state.verifiedData.length = 0;
    },
    setIsVerifiedCheck: (state) => {
      state.isVerifiedCheck = !state.isVerifiedCheck;
    },
  },
});

export const {
  setProductVerifiedData,
  clearProductVerifiedData,
  setIsVerifiedCheck,
} = verifiedSlice.actions;
export default verifiedSlice.reducer;
