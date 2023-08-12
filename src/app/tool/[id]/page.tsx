"use client";
import AffiliateToolBanner from "@/components/affiliate-tool/affiliate-tool-banner";
import BreadCrumb from "@/components/breadcrumb/breadcrumb";
import ProudctCard from "@/components/card/ProductCard";
import { useApiDataContext } from "@/lib/productContext";
import AirtableModel from "@/models/airtableModel";
import { Product } from "@/types/product";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

export default function ToolDetails() {
  const id = useSearchParams().get("id");
  const { apiData } = useApiDataContext();
  const [product, setProductData] = useState<AirtableModel>();

  async function getProductFromId() {
    apiData.filter((product: AirtableModel) => {
      if (product.id === id) {
        setProductData(product);
        return product;
      }
    });
  }

  useEffect(() => {
    console.log("APIII::::CONTEXT:::::", apiData);
    if (product === undefined) {
      getProductFromId();
    }
  }, [apiData]);

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
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center  my-10 w-full font-bold">
        Similar <span className="text-DarkOrange">Other</span> Tools
      </h1>
      <ProudctCard />
    </>
  );
}
