const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const getBookmarkList = createAsyncThunk(
  "bookmark/fetchBookmarkList",
  async () => {
    const response = await fetch("/api/bookmarks");
    const jsonData = await response.json();
    return jsonData.data;
  }
);

export const addBookmark = createAsyncThunk(
  "bookmark/addBookmark",
  async (productId, { dispatch }) => {
    const response = await fetch("/api/bookmarks/" + productId, {
      method: "POST",
    });
    dispatch(getBookmarkList());
    if (!response.ok) {
      throw new Error("Failed to add bookmark");
    }
    return productId;
  }
);

export const deleteBookmark = createAsyncThunk(
  "bookmark/deleteBookmark",
  async (productId, { dispatch }) => {
    const response = await fetch("/api/bookmarks/" + productId, {
      method: "DELETE",
    });

    dispatch(getBookmarkList());

    if (!response.ok) {
      throw new Error("Failed to add bookmark");
    }
    return productId;
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    isBookmarkChecked: false,
    bookmarkList: [],
    status: "idle",
    getListStatus: "idle",
    error: null,
  },
  reducers: {
    setIsBookmarkCheck: (state) => {
      state.isBookmarkChecked = !state.isBookmarkChecked;
    },
    clearBookmarkList: (state) => {
      state.bookmarkList.length = 0;
    },

    updateBookmarkList(state, action) {
      state.bookmarkList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookmarkList.pending, (state, action) => {
        state.getListStatus = "loading";
      })
      .addCase(getBookmarkList.fulfilled, (state, action) => {
        state.getListStatus = "succeeded";
        state.bookmarkList = action.payload;
      })
      .addCase(getBookmarkList.rejected, (state, action) => {
        state.getListStatus = "failed";
        state.error = action.error.message;
      })

      .addCase(addBookmark.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookmarkList.push(action.payload);
      })
      .addCase(addBookmark.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteBookmark.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookmarkList = state.bookmarkList.filter(
          (bookmark) => bookmark.id !== action.payload
        );
      })
      .addCase(deleteBookmark.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setIsBookmarkCheck, clearBookmarkList, setBookmarkList } =
  bookmarkSlice.actions;
export default bookmarkSlice.reducer;
