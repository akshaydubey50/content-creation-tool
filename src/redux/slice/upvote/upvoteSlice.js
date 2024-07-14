const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getUpvoteList = createAsyncThunk(
    "like/fetchUpvoteList",
    async () => {
        const response = await fetch("/api/like");
        const jsonData = await response.json();
        return jsonData
    }
);

export const addUpvote = createAsyncThunk(
    "like/addLike",
    async (productId, { dispatch }) => {
        const response = await fetch("/api/like/" + productId, {
            method: "POST",
        });
        dispatch(getUpvoteList());
        if (!response.ok) {
            throw new Error("Failed to add like");
        }
        return productId;
    }
);

export const deleteUpvote = createAsyncThunk(
    "like/deleteLike",
    async (productId, { dispatch }) => {
        const response = await fetch("/api/like/" + productId, {
            method: "DELETE",
        });

        dispatch(getUpvoteList());

        if (!response.ok) {
            throw new Error("Failed to add like");
        }
        return productId;
    }
);

const bookmarkSlice = createSlice({
    name: "like",
    initialState: {
        isUpvoteChecked: false,
        upvoteList: [],
        status: "idle",
        getListStatus: "idle",
        error: null,
    },
    reducers: {
        setIsUpvoteChecked: (state) => {
            state.isUpvoteChecked = !state.isUpvoteChecked;
        },
        clearUpvoteList: (state) => {
            state.upvoteList.length = 0;
        },

        updateUpvoteList:(state, action) =>{
            state.upvoteList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUpvoteList.pending, (state, action) => {
                state.getListStatus = "loading";
            })
            .addCase(getUpvoteList.fulfilled, (state, action) => {
                state.getListStatus = "succeeded";
                state.upvoteList = action.payload?.likes;
                console.log('upvoteList ####',state.upvoteList)
            })
            .addCase(getUpvoteList.rejected, (state, action) => {
                state.getListStatus = "failed";
                state.error = action.error.message;
            })

            .addCase(addUpvote.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(addUpvote.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.upvoteList = [...state.upvoteList,action.payload];

            })
            .addCase(addUpvote.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(deleteUpvote.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(deleteUpvote.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.upvoteList = state.upvoteList.filter(
                    (like) => like.id !== action.payload
                );
            })
            .addCase(deleteUpvote.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { setIsUpvoteChecked, clearBookmarkList, setBookmarkList } =
    bookmarkSlice.actions;
export default bookmarkSlice.reducer;
