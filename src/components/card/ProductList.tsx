"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/common/Button";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "@/lib/slice/appSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import AirtableModel from "@/models/airtableModel";
import { ProductCard } from "./ProductCard";
import Loader from "../common/Loader/Loader";


interface ProductListProps {
  currentCategory?: string;
}


interface RootState {
  category: {
    matchedCategory: AirtableModel;
  };
  searchProduct: {
    searchQuery: string;
    filterData: AirtableModel;
  };
  appSlice: {
    productList: Object;
  };
}


export default function ProductList({ currentCategory }: ProductListProps) {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const { data }: any = useSelector<any>((state) => state.appSlice.productList);
  const categoryBaseProductFilteredByDropdown: AirtableModel[] = useSelector((store) => store.category.matchedCategory);
  const [productRecord, setProductRecord] = useState<AirtableModel[]>([]);

  const id = useSearchParams().get("id");
  const { visibleItem, setVisibleItem } = useVisibleItemContextData();

  const getProductByCategory = useCallback(
    (categoryType: string): AirtableModel[] | null => {
      if (categoryType !== "") {
        return data?.filter((item: AirtableModel) => {
          if (item?.fields?.Tags[0] === categoryType && item?.id !== id) {
            return categoryType;
          }
        });
      }
      return null;
    },
    [data, id]
  );

  async function loadMore() {
    if (visibleItem < data!.length) {
      setVisibleItem(visibleItem + 9);
    }
  }

  useEffect(() => {
    console.log("useeffect render");
    dispatch(fetchProductList());
  }, []);


  useEffect(() => {
    const filterProductRecord = getProductByCategory(currentCategory);
    if (data && !id) {
      setProductRecord(data);
    } else if (filterProductRecord && id) {
      setProductRecord(filterProductRecord);
    } else if (categoryBaseProductFilteredByDropdown && !id) {
      setProductRecord(categoryBaseProductFilteredByDropdown);
    }
    setVisibleItem(9);
  }, [currentCategory, getProductByCategory, categoryBaseProductFilteredByDropdown, setVisibleItem, data, id]);

  // console.log(" when data is null ui render");
  if (!data) {
    return <Loader />;
  }
  // console.log(" when data has value ui render");
  return (
    <>
      <main
        className="grid grid-cols-1 gap-y-6 md:grid-cols-2  md:gap-8 lg:grid-cols-3 
                  lg:gap-10  w-fit  mx-auto py-5 px-10 lg:px-8 2xl:px-0"
      >
        {productRecord  &&
          productRecord.slice(0, visibleItem).map((item: AirtableModel) => {
            if (!id && !categoryBaseProductFilteredByDropdown && item?.fields?.Description?.trim() !== "") {
              return <ProductCard key={item.id} product={item} />;
            }
            else{
              return <ProductCard key={item.id} product={item} />;
            }
            
          })} 
      </main>
      <LoadMoreBtn />
    </>
  );


  function LoadMoreBtn() {
    return (
      <>
        {!id && visibleItem <= data?.length && data?.length !== 0 && (
          <div onClick={loadMore}>
            <Button value={`Load More All  ${data?.length - visibleItem}`} />
          </div>
        )}

        {/* Render Load More Button for Similar Category Product  */}
        {id && visibleItem < productRecord!.length && (<div onClick={loadMore}>
          <Button value={`Load More Same Category Product ${productRecord?.length - visibleItem}`} />
        </div>)}

      </>
    );
  }
}
