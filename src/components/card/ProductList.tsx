"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "@/redux/slice/product/productSlice";
import AirtableModel from "@/models/airtable.model";
import { ProductCard } from "./ProductCard";
import {
  getBookmarkList,
  setBookmarkList,
} from "@/redux/slice/bookmark/bookmarkSlice";
import { getUpvoteList } from "@/redux/slice/upvote/upvoteSlice";
import Loader from "../common/Loader/Loader";
import { RootState, AppDispatch } from "@/redux/store";
import Pagination from "../pagination/Pagination";
import { useSession } from "next-auth/react";
import { isProductUpvoted } from "@/helper/helper";

interface ProductListProps {
  currentCategory?: string;
}

export default function ProductList({ currentCategory }: ProductListProps) {
  const id = useSearchParams().get("id");

  const params = useParams();
  const slug = params;

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch: AppDispatch = useDispatch();
  const { isUserAuthenticated } = useSelector((store: RootState) => store.user);
  const { data: session } = useSession();
  // console.log('getAuthSession', getAuthSession)
  const { productList, isLoading } = useSelector(
    (state: RootState) => state.product
  );
  // console.log("productList", productList, isLoading);
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
  const bookmarkList: any = useSelector(
    (store: RootState) => store.bookmark.bookmarkList
  );

  const { matchedPrice } = useSelector((state: RootState) => state.priceModel);
  const isBookmark = useSelector(
    (store: RootState) => store.bookmark.isBookmarkChecked
  );

  const upVotedList: any = useSelector(
    (store: RootState) => store.upvote.upvoteList
  );

  const itemsPerPage = 12;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getProductByCategory = useCallback(
    (categoryType: string): AirtableModel[] | null => {
      if (categoryType !== "") {
        return productList?.filter((item: AirtableModel) => {
          const formattedTitle = item?.fields?.Name?.toLowerCase()
            ?.trim()
            ?.replace(/\s/g, "-");

          if (
            item?.fields?.Tags[0] === categoryType &&
            formattedTitle !== slug?.id
          ) {
            return categoryType;
          }
        });
      }
      return null;
    },
    [productList, slug?.id]
  );

  const filteredProductRecords = useMemo(() => {
    setCurrentPage(currentPage);
    let products: AirtableModel[] = [];

    // Existing filtering logic
    if (currentCategory) {
      // Product detail page similar category product listed productList
      products = getProductByCategory(currentCategory) || [];
    } else if (dropDownCategoryArr?.length > 0 && !id) {
      // Dropdown base filtered product productList
      products = dropDownCategoryArr;
    } else if (productSearchQuery.length > 0 && inputSearchFilterArr) {
      // Search input filtered product productList
      products = inputSearchFilterArr.length > 0 ? inputSearchFilterArr : [];
    } else if (matchedPrice.length > 0 && !id) {
      products = matchedPrice;
    } else if (session && isBookmark && bookmarkList) {
      products = productList.filter((item: AirtableModel) =>
        bookmarkList?.includes(item?.id)
      );
    } else if (isVerifiedCheck && verifiedProductArr.length > 0) {
      // Verified Product
      products = verifiedProductArr;
    } else if (productList && !id) {
      // All productList
      products = productList;
    }

    const productsWithUpvotes = products.map((product) => ({
      ...product,
      totalLikes:
        upVotedList?.find((item: any) => item.productId === product.id)
          ?.totalLikes || 0,
    }));

    return productsWithUpvotes.sort((a, b) => b.totalLikes - a.totalLikes);
  }, [
    currentPage,
    currentCategory,
    dropDownCategoryArr,
    id,
    productSearchQuery.length,
    inputSearchFilterArr,
    matchedPrice,
    session,
    isBookmark,
    bookmarkList,
    isVerifiedCheck,
    verifiedProductArr,
    productList,
    getProductByCategory,
    upVotedList,
  ]);
  const updateCurrentProducts = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newCurrentProducts = filteredProductRecords!.slice(
      startIndex,
      endIndex
    );
    return newCurrentProducts;
  }, [currentPage, filteredProductRecords]);

  useEffect(() => {
    updateCurrentProducts();
  }, [currentPage, filteredProductRecords, updateCurrentProducts]);

  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUpvoteList());
    if (session?.user) {
      dispatch(getBookmarkList());
    }
  }, [dispatch, session]);

  if (isLoading) {
    return <Loader />;
  }

  if (isBookmark && bookmarkList.length === 0) {
    return (
      <>
        <div className="text-3xl font-bold  text-center h-80 flex items-center justify-center">
          <h2>No Bookmark yet</h2>
        </div>
      </>
    );
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
                totalLikes={item?.totalLikes}
                upVotedList={upVotedList}
              />
            );
          } else {
            return (
              <ProductCard
                key={item.id}
                product={item}
                isBookmark={isProductBookmarked(item, bookmarkList)}
                bookmarkList={bookmarkList}
                totalLikes={item?.totalLikes}
                upVotedList={upVotedList}
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
      <Pagination
        currentPage={currentPage}
        totalItems={filteredProductRecords!.length}
        onPageChange={handlePageChange}
      />{" "}
    </>
  );
}

export function isProductBookmarked(product: AirtableModel, bookmarkList: any) {
  if (bookmarkList?.length > 0) {
    return bookmarkList?.some((bookmarkID: any) => bookmarkID === product?.id);
  }
  return false;
}
