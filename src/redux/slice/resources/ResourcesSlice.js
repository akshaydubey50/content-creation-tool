const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// get data from airtable list
export const fetchResourcesList = createAsyncThunk(
  "fetch/resourceList",
  async () => {
    const response = await fetch("/api/resources");
    const responseBody = await response.json();
    return responseBody.data;
  }
);

const resourceSlice = createSlice({
  name: "resourceList",
  initialState: {
    isLoading: false,
    isError: false,
    resourceList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResourcesList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.resourceList = action.payload;
    });
    builder.addCase(fetchResourcesList.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchResourcesList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message ?? "Something went wrong";
    });
  },
});

export const { isError, isLoading, resourceList } = resourceSlice.actions;

export default resourceSlice.reducer;
