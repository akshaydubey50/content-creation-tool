import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slice/appSlice";
import bookmarkSlice, { getBookmarkList } from "./slice/bookmarkSlice";
import categorySlice from "./slice/categorySlice";
import searchSlice from "./slice/searchSlice";
import verifiedSlice from "@/lib/slice/verifiedSlice";

const appStore = configureStore({
  reducer: {
    appSlice: appSlice,
    bookmark: bookmarkSlice,
    category: categorySlice,
    searchProduct: searchSlice,
    verifiedProduct: verifiedSlice,
  },
});

// appStore.subscribe(() => {
//   const data = appStore.getState().bookmark.bookmarkList;
//   console.log("APPSOTE BOOKMARK SUBSRIBE BEFORE", data);
//   // appStore.bookmark.dispatch(getBookmarkList());
//   getBookmarkList();
//   console.log("APPSOTE BOOKMARK SUBSRIBE AFTER", data);
//   getBookmarkList();
// });
export default appStore;
