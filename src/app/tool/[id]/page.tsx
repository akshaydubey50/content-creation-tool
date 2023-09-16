      "use client";
import ProductToolBanner from "@/components/product-tool/ProductToolBanner";
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
  console.log('localcatgeory', localCategoryData);
  
  const getProductFromId = useCallback(() => {
    const productMatched = apiData.find(
      (product: AirtableModel) => product.id === id
    );
    // console.log('@@productMatched',productMatched)
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
      <ProudctCard categoryData={localCategoryData} filterData={[]} />
    </>
  );
}
