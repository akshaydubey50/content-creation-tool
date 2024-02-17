import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        matchedCategory: [],
        categoryData: "",
    },

    reducers: {

        setMatchedCategory: (state, action) => {
            // tag base product data
            state.matchedCategory = action.payload
        },
        setCategoryData: (state, action) => {
            // selected dropdown value
            state.categoryData = action.payload;
        },
        clearCategoryData: (state) => {
            // selected dropdown value
            state.categoryData = "";
        },

    },

})


export const { setMatchedCategory, setCategoryData, clearCategoryData } = categorySlice.actions
export default categorySlice.reducer