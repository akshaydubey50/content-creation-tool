import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the Like model
interface Like {
  itemIds: string[];
  itemType: "tool" | "prompt";
}

// Define the initial state and its type
interface LikeState {
  isLikedChecked: boolean;
  likedList: Like[];
  status: "idle" | "loading" | "succeeded" | "failed";
  getLikeListStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: LikeState = {
  isLikedChecked: false,
  likedList: [],
  status: "idle",
  getLikeListStatus: "idle",
  error: null,
};

// Async thunks

// Fetch like list
export const getLikeList = createAsyncThunk<Like[]>(
  "like/fetchLikeList",
  async () => {
    const response = await fetch("/api/like");
    if (!response.ok) {
      throw new Error("Failed to fetch likes");
    }
    const jsonData = await response.json();
    return jsonData.likes as Like[];
  }
);

// Add a like
export const addLike = createAsyncThunk<
  Like,
  { itemId: string; itemType: "tool" | "prompt" }
>("like/addLike", async ({ itemId, itemType }, { dispatch }) => {
  const response = await fetch(`/api/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, itemType }),
  });
  if (!response.ok) {
    throw new Error("Failed to add like");
  }
  await dispatch(getLikeList()); // Re-fetch the like list after adding a like
  return { itemType, itemIds: [itemId] };
});

// Delete a like
export const deleteLike = createAsyncThunk<
  { itemId: string; itemType: "tool" | "prompt" },
  { itemId: string; itemType: "tool" | "prompt" }
>("like/deleteLike", async ({ itemId, itemType }, { dispatch }) => {
  const response = await fetch(`/api/like`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, itemType }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete like");
  }
  await dispatch(getLikeList()); // Re-fetch the like list after deleting a like
  // return itemId as string;
  return { itemId, itemType };
});

// Redux slice

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setIsLikedChecked: (state) => {
      state.isLikedChecked = !state.isLikedChecked;
    },
    clearLikedList: (state) => {
      state.likedList = [];
    },
    updateLikeList: (state, action: PayloadAction<Like[]>) => {
      state.likedList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getLikeList
      .addCase(getLikeList.pending, (state) => {
        state.getLikeListStatus = "loading";
      })
      .addCase(
        getLikeList.fulfilled,
        (state, action: PayloadAction<Like[]>) => {
          state.getLikeListStatus = "succeeded";
          state.likedList = action.payload;
        }
      )
      .addCase(getLikeList.rejected, (state, action) => {
        state.getLikeListStatus = "failed";
        state.error = action.error.message || null;
      })

      // addLike
      .addCase(addLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLike.fulfilled, (state, action: PayloadAction<Like>) => {
        state.status = "succeeded";

        // Find if there's an existing like for the same itemType
        const existingLike = state.likedList.find(
          (like) => like.itemType === action.payload.itemType
        );

        // If found, add the itemId to the itemIds array, else push a new like object
        if (existingLike) {
          existingLike.itemIds.push(action.payload.itemIds[0]);
        } else {
          state.likedList.push(action.payload);
        }
      })
      .addCase(addLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      // deleteLike
      .addCase(deleteLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteLike.fulfilled,
        (
          state,
          action: PayloadAction<{ itemId: string; itemType: string }>
        ) => {
          state.status = "succeeded";
          const existingLiked = state.likedList.find(
            (like) => like.itemType === action.payload.itemType
          );
          if (existingLiked) {
            existingLiked.itemIds = existingLiked.itemIds.filter(
              (id) => id !== action.payload.itemId
            );
          }
        }
      )
      .addCase(deleteLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

// Export actions and reducer
export const { setIsLikedChecked, clearLikedList, updateLikeList } =
  likeSlice.actions;
export default likeSlice.reducer;
