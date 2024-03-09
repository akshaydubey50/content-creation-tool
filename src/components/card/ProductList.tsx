"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/common/Button";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "@/lib/slice/productSlice";
import AirtableModel from "@/models/airtableModel";
import { ProductCard } from "./ProductCard";
import Loader from "../common/Loader/Loader";
import { getBookmarkList, setBookmarkList } from "@/lib/slice/bookmarkSlice";
import Shimmer from "../common/Shimmer";
import { RootState, AppDispatch } from "@/lib/store";

interface ProductListProps {
  currentCategory?: string;
}

export default function ProductList({ currentCategory }: ProductListProps) {
  // remove
  // const [productRecords, setProductRecords] = useState<AirtableModel[]>([]);
  const id = useSearchParams().get("id");
  const { visibleItem, setVisibleItem } = useVisibleItemContextData();

  const dispatch: AppDispatch = useDispatch();
  const { isUserAuthenticated, error, userSession } = useSelector(
    (store: RootState) => store.user
  );

  const { productList } = useSelector((state: RootState) => state.product);
  const dropDownCategoryArr = useSelector(
    (store: RootState) => store.category.matchedCategory
  );
  const inputSearchFilterArr = useSelector(
    (store: RootState) => store.search.searchFilterList
  );
  const verifiedProductArr = useSelector(
    (store: RootState) => store.verifiedProduct.verifiedProductList
  );
  const productSearchQuery = useSelector(
    (store: RootState) => store.search.searchQuery
  );
  const isVerifiedCheck = useSelector(
    (store: RootState) => store.verifiedProduct.isVerifiedChecked
  );
  const bookmarkList = useSelector(
    (store: RootState) => store.bookmark.bookmarkList
  );

  const isBookmark = useSelector(
    (store: RootState) => store.bookmark.isBookmarkChecked
  );
  const bookmarkLoadingStatus = useSelector(
    (store: RootState) => store.bookmark.status
  );
  const userAuthData = useSelector(
    (store: RootState) => store.user.userSession
  );
  const getProductByCategory = useCallback(
    (categoryType: string): AirtableModel[] | null => {
      if (categoryType !== "") {
        return productList?.filter((item: AirtableModel) => {
          if (item?.fields?.Tags[0] === categoryType && item?.id !== id) {
            return categoryType;
          }
        });
      }
      return null;
    },
    [productList, id]
  );

  async function loadMore() {
    if (visibleItem < productList!.length) {
      setVisibleItem(visibleItem + 9);
    }
  }

  useEffect(() => {
    console.log("Useeffect is running");
    dispatch(fetchProductList());
    if(userAuthData){
      dispatch(getBookmarkList());
    }
  }, [dispatch]);

  const filteredProductRecords = useMemo(() => {
    if (currentCategory) {
      // Product detail page similar category product listed productList
      return getProductByCategory(currentCategory);
    } else if (dropDownCategoryArr?.length > 0 && !id) {
      // Dropdown base filtered product productList
      return dropDownCategoryArr;
    } else if (productSearchQuery.length > 0 && inputSearchFilterArr) {
      // Search input filtered product productList
      return inputSearchFilterArr.length > 0 ? inputSearchFilterArr : [];
    } else if (isUserAuthenticated && isBookmark && bookmarkList?.length > 0) {
      return bookmarkList;
    } else if (isVerifiedCheck && verifiedProductArr.length > 0) {
      // Verified Product
      return verifiedProductArr;
    } else if (productList && !id) {
      // All productList
      return productList;
    }
    return [];
  }, [
    currentCategory,
    getProductByCategory,
    dropDownCategoryArr,
    id,
    inputSearchFilterArr,
    isUserAuthenticated,
    isBookmark,
    bookmarkList,
    isVerifiedCheck,
    verifiedProductArr,
    productList,
    productSearchQuery.length,
  ]);

  if (productList.length === 0) {
    return <Loader />;
    // return <Shimmer />;
  }

  return (
    <>
      <main
        className="grid grid-cols-1 gap-y-6 md:grid-cols-2  md:gap-8 lg:grid-cols-3 
                  lg:gap-10  w-fit  mx-auto py-5 px-10 lg:px-8 2xl:px-0"
      >
        {bookmarkLoadingStatus === "succeeded" && bookmarkList?.length == 0 && (
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
        {filteredProductRecords &&
          filteredProductRecords.length > 0 &&
          filteredProductRecords
            .slice(0, visibleItem)
            .map((item: AirtableModel) => {
              if (
                id &&
                dropDownCategoryArr &&
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
                  "For item else condition",
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
      {productSearchQuery.length > 0 && filteredProductRecords?.length == 0 && (
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
        {id && visibleItem < filteredProductRecords!.length && (
          <div onClick={loadMore}>
            <Button
              value={`Load More Similar Category Product ${
                filteredProductRecords!.length - visibleItem
              }`}
            />
          </div>
        )}

        {/* Render Load More Button for Similar Category Product  */}
        {!id && visibleItem < dropDownCategoryArr?.length && (
          <div onClick={loadMore}>
            <Button
              value={`Load More Same Category Product ${
                filteredProductRecords!.length - visibleItem
              }`}
            />
          </div>
        )}

        {/* Render Load More Button for Search Product  */}
        {!id && visibleItem < inputSearchFilterArr?.length && (
          <div onClick={loadMore}>
            <Button
              value={`Load More Search Product ${
                filteredProductRecords!.length - visibleItem
              }`}
            />
          </div>
        )}

        {/* Bookmark Product Load Btn  */}
        {isBookmark && visibleItem < bookmarkList?.length && (
          <div onClick={loadMore}>
            <Button
              value={`Load More Bookmark Product ${
                filteredProductRecords!.length - visibleItem
              }`}
            />
          </div>
        )}

        {/* Verified Product Load Btn  */}
        {isVerifiedCheck && visibleItem < verifiedProductArr?.length && (
          <div onClick={loadMore}>
            <Button
              value={`Load More Verified Product ${
                filteredProductRecords!.length - visibleItem
              }`}
            />
          </div>
        )}

        {/*All productList Load Btn  */}
        {!id &&
          dropDownCategoryArr?.length <= 0 &&
          inputSearchFilterArr?.length <= 0 &&
          productSearchQuery.length === 0 &&
          !isVerifiedCheck &&
          !isBookmark &&
          visibleItem <= productList?.length &&
          productList?.length !== 0 && (
            <div onClick={loadMore}>
              <Button
                value={`Load More   ${productList?.length - visibleItem}`}
              />
            </div>
          )}
      </>
    );
  }
}
