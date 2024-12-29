import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the Item model
interface Item {
  itemId: string;
  totalLikes: number;
  isLikedByUser: boolean;
}

// Define the Like model
interface Like {
  itemType: "tools" | "prompts";
  items: Item[];
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
    console.log("likes from api ==> ", jsonData);
    return jsonData.likes as Like[];
  }
);

// Add a like
export const addLike = createAsyncThunk<
  Like,
  { itemId: string; itemType: "tools" | "prompts" }
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
  return { itemType, items: [{ itemId, totalLikes: 1, isLikedByUser: true }] }; // Adjusted to reflect the response structure
});

// Delete a like
export const deleteLike = createAsyncThunk<
  { itemId: string; itemType: "tools" | "prompts" },
  { itemId: string; itemType: "tools" | "prompts" }
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

        // If found, add the item to the items array, else push a new like object
        if (existingLike) {
          existingLike.items.push(action.payload.items[0]);
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
            existingLiked.items = existingLiked.items.filter(
              (item) => item.itemId !== action.payload.itemId
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
