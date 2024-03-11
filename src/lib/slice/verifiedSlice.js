import { createSlice } from "@reduxjs/toolkit";

const verifiedProductSlice = createSlice({
  name: "verifiedProductSlice",
  initialState: {
    verifiedProductList: [],
    isVerifiedChecked: false,
  },
  reducers: {
    setProductVerifiedList: (state, action) => {
      state.verifiedProductList = action.payload;
    },
    clearProductVerifiedList: (state) => {
      state.verifiedProductList.length = 0;
    },
    setIsVerifiedChecked: (state) => {
      state.isVerifiedChecked = !state.isVerifiedChecked;
    },
  },
});

export const {
  setProductVerifiedList,
  clearProductVerifiedList,
  setIsVerifiedChecked,
} = verifiedProductSlice.actions;
export default verifiedProductSlice.reducer;
