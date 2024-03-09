const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// get data from airtable list
export const fetchProductList = createAsyncThunk("fetch/toolList", async () => {
    const response = await fetch("/api/tools");
    const responseBody = await response.json();
    return responseBody.data;
});

const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        isLoading: false,
        isError: false,
        productList: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload;
        });
        builder.addCase(fetchProductList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProductList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.error.message ?? "Something went wrong";
        });
    },
});

export const { isError, isLoading, productList } = productSlice.actions;

export default productSlice.reducer;