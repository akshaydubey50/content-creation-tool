import { useMemo } from "react";
import { AirtableModel } from "@/models/airtable.model";

export function useFilteredProducts({
  currentCategory,
  productList,
  dropDownCategoryArr,
  id,
  productSearchQuery,
  inputSearchFilterArr,
  matchedPrice,
  session,
  isBookmark,
  bookmarkList,
  isVerifiedCheck,
  verifiedProductArr,
  upVotedList,
  getProductByCategory,
}: any) {
  return useMemo(() => {
    let products: AirtableModel[] = [];

    if (currentCategory) {
      products = getProductByCategory(currentCategory) || [];
    } else if (dropDownCategoryArr?.length > 0 && !id) {
      products = dropDownCategoryArr;
    } else if (productSearchQuery.length > 0 && inputSearchFilterArr) {
      products = inputSearchFilterArr.length > 0 ? inputSearchFilterArr : [];
    } else if (matchedPrice.length > 0 && !id) {
      products = matchedPrice;
    } else if (session && isBookmark && bookmarkList) {
      /*  if (
        !Array.isArray(bookmarkList[0]?.itemIds) ||
        !Array.isArray(productList)
      ) {
        console.error("Either bookmarkList or productList is not an array");
        return [];
      } */

      /*   if (bookmarkList[0]?.itemIds?.length == 0) {
        console.log("bookmarkList[0]?.itemIds?.length", bookmarkList?.length);
        return [];
      } */

      products = productList?.filter((item: AirtableModel) =>
        bookmarkList[0]?.itemIds?.includes(item?.id)
      );
    } else if (isVerifiedCheck && verifiedProductArr.length > 0) {
      products = verifiedProductArr;
    } else if (productList && !id) {
      products = productList;
    }

    const productsWithUpvotes = products.map((product) => ({
      ...product,
      totalLikes:
        upVotedList?.find((item: any) => item?.productId === product?.id)
          ?.totalLikes || 0,
    }));

    return productsWithUpvotes.sort((a, b) => b.totalLikes - a.totalLikes);
  }, [
    currentCategory,
    dropDownCategoryArr,
    id,
    productSearchQuery,
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
}
