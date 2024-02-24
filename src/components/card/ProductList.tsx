"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/common/Button";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "@/lib/slice/appSlice";
import AirtableModel from "@/models/airtableModel";
import { ProductCard } from "./ProductCard";
import Loader from "../common/Loader/Loader";
import { getBookmarkList } from "@/lib/slice/bookmarkSlice";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export default function ProductList() {
  const [bkList, setBkList] = useState(null);
  const getBookListWithId = async () => {
    const supabase = createClientComponentClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      const { data, error } = await supabase
        .from("bookmark")
        .select("product_id")
        .eq("user_id", session.user?.id);
      if (data) {
        setBkList(data);
      }
    }
  };

  const dispatch = useDispatch();

  const { data: productList } = useSelector(
    (store) => store.appSlice.productList
  );
  const bookmarkList = useSelector((store) => store.bookmark.bookmarkList.data);

  const id = useSearchParams().get("id");
  const { visibleItem, setVisibleItem } = useVisibleItemContextData();

  async function loadMore() {
    if (visibleItem < productList!.length) {
      setVisibleItem(visibleItem + 9);
    }
  }
  const fetchProductListAction = useCallback(
    () => dispatch(fetchProductList()),
    [dispatch]
  );

  const memoizedProductList = useMemo(() => productList, [productList]);

  const filterMemoizedProductList = useMemo(() => {
    if (!bkList) return memoizedProductList;
    console.log("bookmark list", bkList);
    return memoizedProductList?.filter((product: AirtableModel) =>
      bkList.some((bookmark) => bookmark.product_id === product.id)
    );
  }, [memoizedProductList, bkList]);

  console.log("filterMemoizedProductList", filterMemoizedProductList);

  useEffect(() => {
    console.log("useEffect render");
    fetchProductListAction();
    // getBookListWithId();
  }, [fetchProductListAction, bkList]);

  if (!filterMemoizedProductList) {
    return <Loader />;
  }

  return (
    <>
      <main
        className="grid grid-cols-1 gap-y-6 md:grid-cols-2  md:gap-8 lg:grid-cols-3 
                  lg:gap-10  w-fit  mx-auto py-5 px-10 lg:px-8 2xl:px-0"
      >
        {/* All data cards listed when filter & category values is empty all data listed on api call */}
        {filterMemoizedProductList &&
          filterMemoizedProductList
            .slice(0, visibleItem)
            .map((item: AirtableModel) => {
              if (item?.fields?.Description?.trim() !== "") {
                return (
                  <ProductCard
                    key={item.id}
                    product={item}
                    isBookmark={isProductBookmarked(item, bookmarkList?.data)}
                  />
                );
              }
            })}
        {/* bookmark */}
        {/*   {bookmarkList?.data &&
          bookmarkList?.data
            .slice(0, visibleItem)
            .map((item: AirtableModel) => {
              if (item?.fields?.Description?.trim() !== "") {
                return (
                  <ProductCard
                    key={item.id}
                    product={item}
                    isBookmark={isProductBookmarked(item, bookmarkList?.data)}
                  />
                );
              }
            })} */}

        <LoadMoreBtn />
      </main>
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
        {visibleItem <= productList?.length && productList?.length !== 0 && (
          <div onClick={loadMore}>
            <Button
              value={`Load More All ${productList.length - visibleItem}`}
            />
          </div>
        )}
      </>
    );
  }
}
