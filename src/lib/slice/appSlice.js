const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// get data from airtable list
export const fetchProductList = createAsyncThunk(
  "fetchProducList",
  async () => {
    const response = await fetch("/api/tools");
    const responseBody = await response.json();
    return responseBody;
  }
);

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    isLoading: false,
    isError: "",
    productList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      state.productList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProductList.pending, (state, action) => {
      state.isLoading = true;
      state.isError = "";
    });
    builder.addCase(fetchProductList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message ?? "Something went wrong";
    });
  },
});

export const { isError, isLoading, productList } = appSlice.actions;

export default appSlice.reducer;
