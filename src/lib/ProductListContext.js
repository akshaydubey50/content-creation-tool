'use client'
import React, { useContext, createContext, useState } from "react";

export const ProductList = createContext();

export function ProductListContextProvider({ children }) {
  const [productList, setProductList] = useState([]);

  return (
    <>
      <ProductList.Provider value={{ productList, setProductList }}>
        {children}
      </ProductList.Provider>
    </>
  );
}

export const useProductListContextData = () => {
  return useContext(ProductList);
};
