import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {
        searchQuery: "",
        searchFilterList: [],
        searchToFocus:false,
        scrollPosition:0
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
        setSearchInputFocus:(state)=>{
            state.searchToFocus = !state.searchToFocus
        },
        scrollPage:(state,action)=>{
            state.scrollPosition = action.payload
        }
    },
});

export const { setSearchQuery, setSearchFilterList, clearSearchFilterList, setSearchInputFocus, scrollPage } =
    searchSlice.actions;

export default searchSlice.reducer;