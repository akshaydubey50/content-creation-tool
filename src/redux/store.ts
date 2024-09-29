import { configureStore } from "@reduxjs/toolkit";
import productSlice from "@/redux/slice/product/product.slice";
import categorySlice from "@/redux/slice/category/category.slice";
import verifiedProductSlice from "@/redux/slice/verified/verified.slice";
import bookmarkSlice from "@/redux/slice/bookmark/bookmark.slice";
import resourceSlice from "@/redux/slice/resources/resource.slice";
import upvoteSlice from "@/redux/slice/upvote/upvoteSlice";
import priceModelSlice from "@/redux/slice/priceModel/priceModel.slice";
import promptResourceSlice from "@/redux/slice/prompt-resource/promptResource.slice";
import authSlice from "@/redux/slice/auth/auth.slice";
import searchSlice from "@/redux/slice/search/search.slice";
import likeSlice from "./slice/like/like.slice";

const appStore = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    bookmarks: bookmarkSlice,
    categories: categorySlice,
    search: searchSlice,
    verifiedProducts: verifiedProductSlice,
    upvotes: upvoteSlice,
    likes: likeSlice,
    pricingModel: priceModelSlice,
    promptResources: promptResourceSlice,
    resources: resourceSlice,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;
