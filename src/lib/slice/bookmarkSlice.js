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
    console.log("productId", productId);
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
    /*  toggleBookmark(state, action) {
      const productId = action.payload;
      const index = state.bookmarkList.findIndex(
        (item) => item.id === productId
      );

      if (index !== -1) {
        state.bookmarkList.splice(index, 1);
      } else {
        state.bookmarkList.push({ id: productId });
      }
    }, */
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookmarkList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBookmarkList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookmarkList = action.payload;
      })
      .addCase(getBookmarkList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addBookmark.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookmarkList.push(action.payload);
        // getBookmarkList();
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
        // getBookmarkList();
      })
      .addCase(deleteBookmark.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    /* .addMatcher(
        (action) =>
          [addBookmark.fulfilled, deleteBookmark.fulfilled].includes(
            action.type
          ),
        (state, action) => {
          getBookmarkList()(state.dispatch, state.getState);
        }
      ); */
  },
});

export const { setIsBookmarkCheck, clearBookmarkList, setBookmarkList } =
  bookmarkSlice.actions;
export default bookmarkSlice.reducer;
