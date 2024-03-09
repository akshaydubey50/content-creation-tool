import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    searchQuery: "",
    searchFilterList: [],
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchFilterList: (state, action) => {
      state.searchFilterList = action.payload;
    },
    clearSearchFilterList: (state) => {
      state.searchFilterList = [];
    },
  },
});

export const { setSearchQuery, setSearchFilterList, clearSearchFilterList } =
  searchSlice.actions;

export default searchSlice.reducer;
