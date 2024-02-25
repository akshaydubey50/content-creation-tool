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
import { getBookmarkList, setBookmarkList } from "@/lib/slice/bookmarkSlice";

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
  verifiedProduct: {
    verifiedData: AirtableModel[];
    isVerifiedCheck: Boolean;
  };
  bookmark: {
    isBookmarkChecked: Boolean;
    bookmarkList: [];
    status: string;
    error: string | null;
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
  const dropDownCategoryArr = useSelector(
    (store: RootState) => store.category.matchedCategory
  );
  const inputSearchFilterArr = useSelector(
    (store: RootState) => store.searchProduct.searchFilterData
  );
  const verifiedProductArr = useSelector(
    (store: RootState) => store.verifiedProduct.verifiedData
  );
  const productSearchQuery = useSelector(
    (store: RootState) => store.searchProduct.searchQuery
  );
  const isVerifiedCheck = useSelector(
    (store: RootState) => store.verifiedProduct.isVerifiedCheck
  );
  const bookmarkList = useSelector(
    (store: RootState) => store.bookmark.bookmarkList
  );

  const isBookmark = useSelector(
    (store: RootState) => store.bookmark.isBookmarkChecked
  );
  const bookmarkLoadingStatus = useSelector<any>(
    (store) => store.bookmark.status
  );
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
    dispatch(getBookmarkList());
  }, [dispatch]);

  useEffect(() => {
    console.log("isVerifiedCheck", isVerifiedCheck);
    console.log("isBookmarkChedk", isBookmark);
    const filterProductRecord = currentCategory
      ? getProductByCategory(currentCategory)
      : null;
    if (filterProductRecord && id) {
      /*product detail page similar category product listed data*/
      setProductRecords(filterProductRecord);
    } else if (dropDownCategoryArr?.length > 0 && !id) {
      /*dropdown base filtered product data*/
      setProductRecords(dropDownCategoryArr);
    } else if (productSearchQuery.length > 0 && inputSearchFilterArr) {
      /*search input filtered product data*/
      if (inputSearchFilterArr.length > 0) {
        setProductRecords(inputSearchFilterArr);
      } else if (
        productSearchQuery.length > 0 &&
        inputSearchFilterArr.length == 0
      ) {
        setProductRecords([]);
      }
    } else if (isBookmark && bookmarkList.length > 0) {
      setProductRecords(bookmarkList);
    } else if (isVerifiedCheck && verifiedProductArr.length > 0) {
      /*Verified Product*/
      setProductRecords(verifiedProductArr);
    } else if (!isBookmark && data && !id) {
      /*All Data*/
      setProductRecords(data);
    }
  
    // setVisibleItem(9);/
  }, [
    currentCategory,
    getProductByCategory,
    dropDownCategoryArr,
    setVisibleItem,
    data,
    id,
    inputSearchFilterArr,
    isVerifiedCheck,
    isBookmark,
    bookmarkList,
    bookmarkList.length,
    productRecords,
    productSearchQuery.length,
    verifiedProductArr,
    bookmarkLoadingStatus,
  ]);

  if (!data) {
    return <Loader />;
  }
  if (isBookmark && bookmarkLoadingStatus === "loading"){
    return <Loader />;
  }
  

  return (
    <>
      <main
        className="grid grid-cols-1 gap-y-6 md:grid-cols-2  md:gap-8 lg:grid-cols-3 
                  lg:gap-10  w-fit  mx-auto py-5 px-10 lg:px-8 2xl:px-0">
        {productRecords?.length > 0  &&
          productRecords?.slice(0, visibleItem).map((item: AirtableModel) => {
            if (
              !id &&
              !dropDownCategoryArr &&
              item?.fields?.Description?.trim() !== ""
            ) {
              return (
                <ProductCard
                  key={item.id}
                  product={item}
                  isBookmark={isProductBookmarked(item, bookmarkList)}
                  bookmarkList={bookmarkList}
                />
              );
            } else {
              console.log(
                "For item else condition ",
                item?.fields?.Name,
                isProductBookmarked(item, bookmarkList)
              );
              return (
                <ProductCard
                  key={item.id}
                  product={item}
                  isBookmark={isProductBookmarked(item, bookmarkList)}
                  bookmarkList={bookmarkList}
                />
              );
            }
          })}
      </main>
      {productSearchQuery.length > 0 && productRecords.length == 0 && (
        <>
          <h1 className="text-3xl   text-center">
            No Search
            <span className="font-bold">
              {" "}
              &quot;{productSearchQuery}&quot;{" "}
            </span>
            found
          </h1>
        </>
      )}
      {bookmarkLoadingStatus === "succeeded" && bookmarkList.length == 0 && isBookmark && (
        <>
          <h1 className="text-3xl font-bold  text-center">No Bookmark yet</h1>
        </>
      )}
      {bookmarkLoadingStatus === "loading" && isBookmark && bookmarkList && (
        <>
          <h1 className="text-3xl font-bold  text-center">
            Loading BookmarkList...
          </h1>
        </>
      )}

      <LoadMoreBtn />
    </>
  );

  function isProductBookmarked(
    product: AirtableModel,
    bookmarkList: AirtableModel[]
  ) {
    if (bookmarkList) {
      return bookmarkList?.some((bookmark) => bookmark?.id === product.id);
    }
    return false;
  }

  function LoadMoreBtn() {
    return (
      <>
        {/* Render Load More Button for Similar Category Product  */}
        {id && visibleItem < productRecords!.length && (
          <div onClick={loadMore}>
            <Button
              value={`Load More Similar Category Product ${
                productRecords?.length - visibleItem
              }`}
            />
          </div>
        )}

        {/* Render Load More Button for Similar Category Product  */}
        {!id && visibleItem < dropDownCategoryArr?.length && (
          <div onClick={loadMore}>
            <Button
              value={`Load More Same Category Product ${
                productRecords?.length - visibleItem
              }`}
            />
          </div>
        )}

        {/* Render Load More Button for Search Product  */}
        {!id && visibleItem < inputSearchFilterArr?.length && (
          <div onClick={loadMore}>
            <Button
              value={`Load More Search Product ${
                productRecords?.length - visibleItem
              }`}
            />
          </div>
        )}

        {/* Bookmark Product Load Btn  */}
        {isBookmark && visibleItem < bookmarkList?.length && (
          <div onClick={loadMore}>
            <Button
              value={`Load More Bookmark Product ${
                productRecords?.length - visibleItem
              }`}
            />
          </div>
        )}

        {/* Verified Product Load Btn  */}
        {isVerifiedCheck && visibleItem < verifiedProductArr?.length && (
          <div onClick={loadMore}>
            <Button
              value={`Load More Verified Product ${
                productRecords?.length - visibleItem
              }`}
            />
          </div>
        )}

        {/*All Data Load Btn  */}
        {!id &&
          dropDownCategoryArr?.length <= 0 &&
          inputSearchFilterArr?.length <= 0 &&
          productSearchQuery.length === 0 &&
          !isVerifiedCheck &&
          !isBookmark &&
          visibleItem <= data?.length &&
          data?.length !== 0 && (
            <div onClick={loadMore}>
              <Button value={`Load More   ${data?.length - visibleItem}`} />
            </div>
          )}
      </>
    );
  }
}
