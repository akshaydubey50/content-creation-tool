const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// get data from airtable list
export const fetchPromptResourceList = createAsyncThunk(
  "fetch/promptResourceList",
  async () => {
    const response = await fetch("/api/prompts");
    const responseBody = await response.json();
    console.log("responseBody", responseBody);
    return responseBody.data;
  }
);

const promptResourceSlice = createSlice({
  name: "promptResourceList",
  initialState: {
    isLoading: true,
    isError: false,
    promptResourceList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPromptResourceList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.promptResourceList = action.payload;
    });
    builder.addCase(fetchPromptResourceList.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPromptResourceList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message ?? "Something went wrong";
    });
  },
});

export const { isError, isLoading, promptResourceList } =
  promptResourceSlice.actions;

export default promptResourceSlice.reducer;
