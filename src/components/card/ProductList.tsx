"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/common/Button";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "@/lib/slice/appSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import AirtableModel from "@/models/airtableModel";
import { ProductCard } from "./ProductCard";
import Loader from "../common/Loader/Loader";

export default function ProductList() {
  const [filterProduct, setfilterProduct] = useState(null);
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();

  const id = useSearchParams().get("id");
  const { visibleItem, setVisibleItem } = useVisibleItemContextData();

  async function loadMore() {
    if (visibleItem < data!.length) {
      setVisibleItem(visibleItem + 9);
    }
  }

  useEffect(() => {
    console.log("useeffect render");
    dispatch(fetchProductList());
  }, []);

  const { data }: any = useSelector<any>((state) => state.appSlice.productList);
  // const { data } = productList;
  console.log(" when data is null ui render");
  if (!data) {
    return <Loader />;
  }
  console.log(" when data has value ui render");
  return (
    <>
      <main
        className="grid grid-cols-1 gap-y-6 md:grid-cols-2  md:gap-8 lg:grid-cols-3 
                  lg:gap-10  w-fit  mx-auto py-5 px-10 lg:px-8 2xl:px-0"
      >
        {/* All data cards listed when filter & category values is empty all data listed on api call */}
        {data &&
          data.slice(0, visibleItem).map((item: AirtableModel) => {
            if (item?.fields?.Description?.trim() !== "") {
              return <ProductCard key={item.id} product={item} />;
            }
          })}

        <LoadMoreBtn />
      </main>
    </>
  );
  function LoadMoreBtn() {
    return (
      <>
        {visibleItem <= data?.length && data?.length !== 0 && (
          <div onClick={loadMore}>
            <Button value={`Load More All ${data?.length - visibleItem}`} />
          </div>
        )}
      </>
    );
  }
}
