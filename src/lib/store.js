import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slice/appSlice";
import bookmarkSlice from "./slice/bookmarkSlice";

const appStore = configureStore({
  reducer: {
    bookmark: bookmarkSlice,
    appSlice: appSlice,
  },
});

export default appStore;
