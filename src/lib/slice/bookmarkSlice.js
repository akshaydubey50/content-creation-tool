const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const getBookmarkList = createAsyncThunk("getBookmarkList", async () => {
  const response = await fetch("/api/bookmarks");
  const json = await response.json();
  return json;
});

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    isLoading: false,
    isError: "",
    bookmarkList: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getBookmarkList.pending, (state, action) => {
      state.isLoading = true;
      state.isError = "";
    });
    builder.addCase(getBookmarkList.fulfilled, (state, action) => {
      state.bookmarkList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getBookmarkList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  },
});

export default bookmarkSlice.reducer;
