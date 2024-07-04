"use client";
import React from "react";
import { VisibleItemContextProvider } from "@/lib/visibleItemContext";
import { ProductListContextProvider } from "@/lib/ProductListContext";
import { Provider } from "react-redux";
import appStore from "@/redux/store";

export default function Providers({ children }) {
  return (
    <ProductListContextProvider>
      <VisibleItemContextProvider>
        <Provider store={appStore}>{children}</Provider>
      </VisibleItemContextProvider>
    </ProductListContextProvider>
  );
}
