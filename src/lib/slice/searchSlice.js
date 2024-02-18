import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchQuery: "",
        searchFilterData: [],

    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        setSearchFilterData: (state, action) => {
            state.searchFilterData = action.payload;
        },
        clearSearchFilterData: (state,) => {
            state.searchFilterData = [];
        },

    },

})


export const { setSearchQuery, setSearchFilterData, clearSearchFilterData } = searchSlice.actions
export default searchSlice.reducer