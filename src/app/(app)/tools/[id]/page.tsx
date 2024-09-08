"use client";
import React, { useCallback, useEffect, useState } from "react";
import ProductToolBanner from "@/components/product-tool/ProductToolBanner";
import ProductList from "@/components/card/ProductList";
import AirtableModel from "@/models/airtable.model";
import { useSearchParams, useParams } from "next/navigation";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ProductDetail() {
  const id = useSearchParams().get("id");
  const { productList } = useSelector((state: RootState) => state.product);
  const [product, setProductData] = useState<AirtableModel>();
  const { setVisibleItem } = useVisibleItemContextData();
  const currentCategory = product && product!.fields.Tags[0];
  const params = useParams();
  const slug = params;
  const getProductFromId = useCallback(() => {
    const productMatched = productList!.find((product: AirtableModel) => {
      const formattedTitle = product?.fields?.Name?.toLowerCase()
        ?.trim()
        ?.replace(/\s/g, "-");
      return formattedTitle === slug?.id;
    });

    console.log("productMatched", productMatched);
    if (productMatched) {
      setProductData(productMatched);
    }
  }, [slug?.id, productList]);

  useEffect(() => {
    setVisibleItem(12);

    if (!product) {
      getProductFromId();
    }
  }, [product, id, productList, getProductFromId, setVisibleItem]);

  return (
    <>
      {product && (
        <>
          <ProductToolBanner
            url={product!.fields.ToolImage}
            title={product!.fields.Name}
            description={product!.fields.Description}
            tag={product!.fields.Tags}
            link={product!.fields.WebsiteLink}
            id={product!.id}
            verified={product!.fields.Verified}
            Pricing={product!.fields.Pricing}
          />

          <div className="px-4">
            <h1 className="text-xl md:text-3xl lg:text-4xl text-center  my-6 md:my-8 w-full font-bold">
              Similar{" "}
              <span className="text-DarkOrange">{product!.fields.Tags}</span>{" "}
              Tools
            </h1>
          </div>
        </>
      )}
      <ProductList currentCategory={currentCategory} />
    </>
  );
}
