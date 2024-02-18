const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const getBookmarkList = createAsyncThunk("getBookmarkList", async () => {
  const supabase = createClientComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session?.user) {
    const { data, error } = await supabase
      .from("bookmark")
      .select("product_id")
      .eq("user_id", session.user?.id);
    return data;
  }
});

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmark: [],
    bookmarkList: [],
    isBookmarkClicked: false,
  },
  reducers: {
    bookmarkToggle: (state) => {
      state.isBookmarkClicked = !state.isBookmarkClicked;
    },
    /*  addBookMark: () => {
      // get product id
      //
    },
    removeBookMark: () => {},
    getBookMarkList: (state, action) => {
      // db call list
      state.bookMarkList.push(action.payload); //   console.log("bookmark list current state", current(bookMarkList));
    }, */
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
