const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const getBookmarkList = createAsyncThunk("getBookmarkList", async () => {
  const fetchData = await fetch('/api/bookmarks');
  const jsonData = await fetchData.json();
  return jsonData;
});

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmark: [],
    bookmarkList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getBookmarkList.fulfilled, (state, action) => {
      state.bookmarkList = action.payload;
    });
    builder.addCase(getBookmarkList.rejected, (state, action) => {
      state.bookmarkList = action.error.message;
    });
  },
});

export const { addBookMark, removeBookMark, bookmarkToggle } =
  bookmarkSlice.actions;
export default bookmarkSlice.reducer;
