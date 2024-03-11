import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/lib/slice/userSlice";
import productSlice from "@/lib/slice/productSlice";
import bookmarkSlice from "@/lib/slice/bookmarkSlice";
import categorySlice from "@/lib/slice/categorySlice";
import searchSlice from "@/lib/slice/searchSlice";
import verifiedProductSlice from "@/lib/slice/verifiedSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    bookmark: bookmarkSlice,
    category: categorySlice,
    search: searchSlice,
    verifiedProduct: verifiedProductSlice,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;
