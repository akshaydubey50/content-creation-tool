const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getLikeList = createAsyncThunk(
  "like/fetchUpvoteList",
  async () => {
    const response = await fetch("/api/like");
    const jsonData = await response.json();
    return jsonData;
  }
);

export const addLike = createAsyncThunk(
  "like/addLike",
  async (productId, { dispatch }) => {
    const { itemId, itemType } = productId;
    const response = await fetch("/api/like/" + itemId, {
      method: "POST",
    });
    dispatch(getLikeList());
    if (!response.ok) {
      throw new Error("Failed to add like");
    }
    return itemId;
  }
);

export const deleteLike = createAsyncThunk(
  "like/deleteLike",
  async (productId, { dispatch }) => {
    const { itemId, itemType } = productId;
    const response = await fetch("/api/like/" + itemId, {
      method: "DELETE",
    });

    dispatch(getLikeList());

    if (!response.ok) {
      throw new Error("Failed to add like");
    }
    return itemId;
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState: {
    isLikedChecked: false,
    likedList: [],
    status: "idle",
    getLikeListStatus: "idle",
    error: null,
  },
  reducers: {
    setIsLikedChecked: (state) => {
      state.isLikedChecked = !state.isLikedChecked;
    },
    clearLikedList: (state) => {
      state.likedList.length = 0;
    },
    updateUpvoteList: (state, action) => {
      state.likedList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLikeList.pending, (state, action) => {
        state.getLikeListStatus = "loading";
      })
      .addCase(getLikeList.fulfilled, (state, action) => {
        state.getLikeListStatus = "succeeded";
        state.likedList = action.payload?.likes;
      })
      .addCase(getLikeList.rejected, (state, action) => {
        state.getLikeListStatus = "failed";
        state.error = action.error.message;
      })

      .addCase(addLike.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.likedList = [...state.likedList, action.payload];
      })
      .addCase(addLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteLike.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.likedList = state.likedList.filter(
          (like) => like.id !== action.payload
        );
      })
      .addCase(deleteLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setIsLikedChecked, clearLikedList, seLikedList } =
  likeSlice.actions;
export default likeSlice.reducer;
