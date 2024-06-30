import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/redux/slice/user/userSlice";
import productSlice from "@/redux/slice/product/productSlice";
import bookmarkSlice from "@/redux/slice/bookmark/bookmarkSlice";
import categorySlice from "@/redux/slice/category/categorySlice";
import searchSlice from "@/redux/slice/search/searchSlice";
import verifiedProductSlice from "@/redux/slice/verified/verifiedSlice";
import upvoteSlice from "./slice/upvote/upvoteSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    bookmark: bookmarkSlice,
    category: categorySlice,
    search: searchSlice,
    verifiedProduct: verifiedProductSlice,
    upvote:upvoteSlice
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;
