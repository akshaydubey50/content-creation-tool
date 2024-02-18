import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slice/appSlice";
import bookmarkSlice from "./slice/bookmarkSlice";
import categorySlice from "./slice/categorySlice";
import searchSlice from "./slice/searchSlice"

const appStore = configureStore({
  reducer: {
    bookmark: bookmarkSlice,
    appSlice: appSlice,
    category: categorySlice,
    searchProduct: searchSlice    
  },
});

export default appStore;
