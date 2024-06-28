"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "@/redux/slice/product/productSlice";
import AirtableModel from "@/models/airtable.model";
import { ProductCard } from "./ProductCard";
import {
  getBookmarkList,
  setBookmarkList,
} from "@/redux/slice/bookmark/bookmarkSlice";
import Loader from "../common/Loader/Loader";
import { RootState, AppDispatch } from "@/redux/store";
import Pagination from "../pagination/Pagination";

interface ProductListProps {
  currentCategory?: string;
}

export default function ProductList({ currentCategory }: ProductListProps) {
  const id = useSearchParams().get("id");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch: AppDispatch = useDispatch();
  const { isUserAuthenticated } = useSelector((store: RootState) => store.user);

  const productList = useSelector(
    (state: RootState) => state.product.productList
  );
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
  const userAuthData:any = useSelector(
    (store: RootState) => store.user.isUserAuthenticated
  );
  const bookmarkLoadingStatus = useSelector(
    (store: RootState) => store.bookmark.status
  );
  const getListBookmarkStatus = useSelector(
    (store: RootState) => store.bookmark.getListStatus
  );

  const itemsPerPage = 9;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const updateCurrentProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newCurrentProducts = filteredProductRecords!.slice(
      startIndex,
      endIndex
    );
    return newCurrentProducts;
  };

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

  const filteredProductRecords = useMemo(() => {
    setCurrentPage(1);

    if (currentCategory) {
      // Product detail page similar category product listed productList
      return getProductByCategory(currentCategory);
    } else if (dropDownCategoryArr?.length > 0 && !id) {
      // Dropdown base filtered product productList
      return dropDownCategoryArr;
    } else if (productSearchQuery.length > 0 && inputSearchFilterArr) {
      // Search input filtered product productList
      return inputSearchFilterArr.length > 0 ? inputSearchFilterArr : [];
    } else if (isUserAuthenticated && isBookmark && bookmarkList) {
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

  useEffect(() => {
    updateCurrentProducts();
  }, [currentPage, filteredProductRecords]);

  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  useEffect(() => {
    if (userAuthData?.ok) {
      dispatch(getBookmarkList());
    }
  }, [dispatch, userAuthData]);

  // issue with these if condition while search tool and checking bookmarklist loader Ui shown
  // if (filteredProductRecords!.length === 0) {
  //   return <Loader />;
  // }

  if (!productList) {
    return <Loader />;
  }

  if (isBookmark && bookmarkLoadingStatus === "loading") {
    return <Loader />;
  }
  if (getListBookmarkStatus === "loading") {
    return <Loader />;
  }

  return (
    <>
      {/* Search Result Text */}
      {/* {productSearchQuery.length > 0 && <p className="text-center text-2xl  ">Search Result
        <span className="font-semibold text-4xl">
           {productSearchQuery} </span></p>} */}
      <main
        className="grid grid-cols-1 gap-y-6 md:grid-cols-2  md:gap-8 lg:grid-cols-3 
                  lg:gap-10  w-fit  mx-auto py-5 px-10 lg:px-8 2xl:px-0"
      >
        {updateCurrentProducts().map((item: AirtableModel) => {
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
          <h1 className="text-3xl text-center">
            No Search
            <span className="font-bold">
              {" "}
              &quot;{productSearchQuery}&quot;{" "}
            </span>
            found
          </h1>
        </>
      )}
      {isBookmark &&
        getListBookmarkStatus === "succeeded" &&
        bookmarkList.length == 0 && (
          <>
            <h1 className="text-3xl font-bold  text-center">No Bookmark yet</h1>
          </>
        )}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredProductRecords!.length}
        onPageChange={handlePageChange}
      />{" "}
    </>
  );
}

export function isProductBookmarked(
  product: AirtableModel,
  bookmarkList: AirtableModel[]
) {
  if (bookmarkList) {
    return bookmarkList?.some((bookmark) => bookmark?.id === product.id);
  }
  return false;
}
