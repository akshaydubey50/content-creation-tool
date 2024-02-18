"use client";
import React, { useCallback, useEffect, useState } from "react";
import ProductToolBanner from "@/components/product-tool/ProductToolBanner";
import ProductList from "@/components/card/ProductList";
import AirtableModel from "@/models/airtableModel";
import { useSearchParams } from "next/navigation";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import {  useSelector } from "react-redux";


export default function ProductDetail() {
  const id = useSearchParams().get("id");
  const { data }: any = useSelector<any>((state) => state.appSlice.productList);
  const [product, setProductData] = useState<AirtableModel>();
  const { setVisibleItem } = useVisibleItemContextData();
  const currentCategory = product && product!.fields.Tags[0];

  const getProductFromId = useCallback(() => {
    const productMatched = data?.find(
      (product: AirtableModel) => product.id === id
    );
    // console.log('@@productMatched',productMatched)
    if (productMatched) {
      setProductData(productMatched);
    }
  }, [id, data]);

  useEffect(() => {
    setVisibleItem(9);

    if (!product) {
      getProductFromId();
    }
  }, [product, id, data, getProductFromId, setVisibleItem]);

  return (
    <>
      {product && (
        <ProductToolBanner
          url={product!.fields.ToolImage}
          title={product!.fields.Name}
          description={product!.fields.Description}
          tag={product!.fields.Tags}
          link={product!.fields.WebsiteLink}
        />
      )}
      {product && (
        <h1 className="text-xl md:text-3xl lg:text-4xl text-center  my-6 md:my-8 w-full font-bold">
          Similar{" "}
          <span className="text-DarkOrange">{product!.fields.Tags}</span> Tools
        </h1>
      )}
      <ProductList currentCategory={currentCategory}/>
    </>
  );
}
