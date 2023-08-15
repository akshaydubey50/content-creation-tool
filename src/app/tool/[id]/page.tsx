"use client";
import AffiliateToolBanner from "@/components/affiliate-tool/affiliate-tool-banner";
import ProudctCard from "@/components/card/ProductCard";
import { useApiDataContext } from "@/lib/productContext";
import AirtableModel from "@/models/airtableModel";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function ToolDetails() {
  const id = useSearchParams().get("id");
  const { apiData } = useApiDataContext();
  const [product, setProductData] = useState<AirtableModel>();
  const localCategoryData = product && product!.fields.Tags[0];

  const getProductFromId = useCallback(() => {
    const productMatched = apiData.find(
      (product: AirtableModel) => product.id === id
    );
    if (productMatched) {
      setProductData(productMatched);
    }
  }, [id, apiData]);

  useEffect(() => {
    if (!product) {
      getProductFromId();
    }
  }, [product, id, apiData, getProductFromId]);

  return (
    <>
      {product && (
        <AffiliateToolBanner
          url={product!.fields.ToolImage[0].url}
          title={product!.fields.Name}
          description={product!.fields.Description}
          tag={product!.fields.Tags}
          link={product!.fields.WebsiteLink}
        />
      )}
      {product && (
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center  my-10 w-full font-bold">
          Similar{" "}
          <span className="text-DarkOrange">{product!.fields.Tags}</span> Tools
        </h1>
      )}
      <ProudctCard categoryData={localCategoryData} filterData={[]} />
    </>
  );
}
