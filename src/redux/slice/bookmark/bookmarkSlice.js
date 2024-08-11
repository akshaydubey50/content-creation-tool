const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getBookmarkList = createAsyncThunk(
  "bookmark/fetchBookmarkList",
  async () => {
    const response = await fetch("/api/bookmark");
    const jsonData = await response.json();
    return jsonData?.bookmarks[0]?.productIds;
  }
);

export const addBookmark = createAsyncThunk(
  "bookmark/addBookmark",
  async (productId, { dispatch }) => {
    const response = await fetch("/api/bookmark/" + productId, {
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
    const response = await fetch("/api/bookmark/" + productId, {
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
        console.log("bookmarkList", state.bookmarkList);
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
        state.bookmarkList = [...state.bookmarkList, action.payload];
        console.log("bookmarkList add", state.bookmarkList);
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
        state.bookmarkList = state.bookmarkList?.filter(
          (bookmarkId) => bookmarkId !== action.payload
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
