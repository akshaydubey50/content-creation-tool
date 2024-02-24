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
    matchedCategory: AirtableModel[];
  };
  searchProduct: {
    searchQuery: string;
    searchFilterData: AirtableModel[];
  };
  appSlice: {
    productList: Object;
  };
}


export default function ProductList({ currentCategory }: ProductListProps) {
  const [productRecords, setProductRecords] = useState<AirtableModel[]>([]);
  const id = useSearchParams().get("id");
  const { visibleItem, setVisibleItem } = useVisibleItemContextData();


  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const { data }: any = useSelector<any>((state) => state.appSlice.productList);
  const dropDownCategoryArr = useSelector((store: RootState) => store.category.matchedCategory);
  const inputSearchFilterArr = useSelector((store: RootState) => store.searchProduct.searchFilterData)
  const productSearchQuery = useSelector((store: RootState) => store.searchProduct.searchQuery)


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
    dispatch(fetchProductList());
  }, []);



  useEffect(() => {
    const filterProductRecord = currentCategory ? getProductByCategory(currentCategory) : null;
    if (filterProductRecord && id) {
      /*product detail page similar category product listed data*/
      setProductRecords(filterProductRecord);
    } else if (dropDownCategoryArr?.length > 0 && !id) {
      /*dropdown base filtered product data*/
      setProductRecords(dropDownCategoryArr);
    }
    else if (productSearchQuery.length > 0 && inputSearchFilterArr) {
      /*search input filtered product data*/
      if (inputSearchFilterArr.length > 0) {
        setProductRecords(inputSearchFilterArr);
      }
      else if (productSearchQuery.length > 0 && inputSearchFilterArr.length == 0) {
        setProductRecords([]);
      }
    }
    else if (data && !id) {
      /*All Data*/
      setProductRecords(data);
    }
    setVisibleItem(9);
  }, [currentCategory, getProductByCategory, dropDownCategoryArr, setVisibleItem, data, id, inputSearchFilterArr]);

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <main
        className="grid grid-cols-1 gap-y-6 md:grid-cols-2  md:gap-8 lg:grid-cols-3 
                  lg:gap-10  w-fit  mx-auto py-5 px-10 lg:px-8 2xl:px-0"
      >
        {productRecords.length > 0 &&
          productRecords.slice(0, visibleItem).map((item: AirtableModel) => {
            if (!id && !dropDownCategoryArr && item?.fields?.Description?.trim() !== "") {
              return <ProductCard key={item.id} product={item} />;
            }
            else {
              return <ProductCard key={item.id} product={item} />;
            }

          })}
      </main>
      {productSearchQuery.length > 0 && productRecords.length == 0 &&
        <>
          <h1 className="text-3xl   text-center">
            No Search 
          <span className="font-bold"> &quot;{productSearchQuery}&quot; </span>
            found
            </h1>
        </>
      }

      <LoadMoreBtn />
    </>
  );

  function LoadMoreBtn() {
    return (
      <>

        {/* Render Load More Button for Similar Category Product  */}
        {id && visibleItem < productRecords!.length && (<div onClick={loadMore}>
          <Button value={`Load More Similar Category Product ${productRecords?.length - visibleItem}`} />
        </div>)}


        {/* Render Load More Button for Similar Category Product  */}
        {!id && visibleItem < dropDownCategoryArr!.length && (<div onClick={loadMore}>
          <Button value={`Load More Same Category Product ${productRecords?.length - visibleItem}`} />
        </div>)}

        {/* Render Load More Button for Search Product  */}
        {!id && visibleItem < inputSearchFilterArr?.length && (<div onClick={loadMore}>
          <Button value={`Load More Search Product ${productRecords?.length - visibleItem}`} />
        </div>)}

        {!id && (dropDownCategoryArr.length <= 0 && inputSearchFilterArr?.length <= 0 && productSearchQuery.length === 0) && visibleItem <= data?.length && data?.length !== 0 && (
          <div onClick={loadMore}>
            <Button value={`Load More All  ${data?.length - visibleItem}`} />
          </div>
        )}

      </>
    );
  }
}


