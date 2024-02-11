import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import searchSlice from "./searchSlice";

export const appStore = configureStore(({
    reducer: {
        category: categorySlice,
        searchProduct: searchSlice    
    }
}))


