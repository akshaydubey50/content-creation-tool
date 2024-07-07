import { createSlice } from "@reduxjs/toolkit";

const priceModelSlice = createSlice({
    name: "priceModel",
    initialState: {
        matchedPrice: [],
        priceData: "",
    },

    reducers: {

        setMatchedPrice: (state, action) => {
            // tag base product data
            state.matchedPrice = action.payload
        },
        setPriceData: (state, action) => {
            // selected dropdown value
            state.priceData = action.payload;
        },
        clearPriceData: (state) => {
            // selected dropdown value
            state.priceData = null;
        },

        clearMatchedPrice: (state) => {
            // tag base product data
            state.matchedPrice.length = 0;
        },

    },

})


export const { clearMatchedPrice, clearPriceData, setPriceData, setMatchedPrice } = priceModelSlice.actions
export default priceModelSlice.reducer