"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AirtableModel from "@/models/airtableModel";
import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader/Loader";
import { ContentToolCard } from "./ContentToolCard";
import { useApiDataContext } from "@/lib/productContext";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import { useVerifiedToolContextData } from "@/lib/verifiedToolContext";
import { useBookMarkedToolContextData } from "@/lib/bookMarkContext";
import { useLikedToolContextData } from "@/lib/likedToolContext";

export default function ProudctCard({
  filterData,
  categoryData,
  isFromUrl = false,
}: any) {
  const id = useSearchParams().get("id");
  const [isLoading, setIsLoading] = useState(true);

  const { apiData } = useApiDataContext();
  const { isVerifiedFilled, setIsVerifiedFilled } =
    useVerifiedToolContextData();

  const { isBookMarkFilled, bookMarkedTool, handleBookMarkedClick } =
    useBookMarkedToolContextData();

  const { islikeFilled, likedTool } = useLikedToolContextData();
  const { visibleItem, setVisibleItem } = useVisibleItemContextData();

  async function loadMore() {
    if (
      isFromUrl &&
      categoryData !== undefined &&
      visibleItem < categoryData!.length
    ) {
      setVisibleItem(visibleItem + 9);
    }
    if (
      !isFromUrl &&
      getProductByCategory(categoryData) !== null &&
      visibleItem < getProductByCategory(categoryData)!.length
    ) {
      setVisibleItem(visibleItem + 9);
    }
    if (visibleItem < filterData!.length || visibleItem < apiData?.length) {
      setVisibleItem(visibleItem + 9);
    }
    if (isVerifiedFilled && visibleItem < verifiedTool()?.length) {
      setVisibleItem(visibleItem + 9);
    }
  }

  const getProductByCategory = useCallback(
    (categoryType: string): AirtableModel[] | null => {
      if (categoryType !== "") {
        return apiData.filter((item: AirtableModel) => {
          if (item?.fields?.Tags[0] === categoryType && item?.id !== id) {
            return categoryType;
          }
        });
      }
      return null;
    },
    [apiData, id]
  );

  const verifiedTool = () => {
    let verifyTool = apiData
      .filter((item: AirtableModel) => item.fields.Verified)
      .map((item: AirtableModel) => (
        <ContentToolCard
          key={item.id}
          id={item.id}
          url={item.fields.ToolImage}
          title={item.fields.Name}
          description={item.fields.Description}
          tag={item.fields.Tags}
          link={item.fields.WebsiteLink}
          isVerified={item.fields?.Verified}
        />
      ));
    console.log("verifyTool:::", verifyTool);
    return verifyTool;
  };

  useEffect(() => {
    getProductByCategory(categoryData);
    setIsLoading(false);
    console.log("card visibleItem:::::::", visibleItem);
  }, [filterData, categoryData, visibleItem, getProductByCategory]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main
          className="grid grid-cols-1 gap-y-6 md:grid-cols-2  md:gap-8 lg:grid-cols-3 
      lg:gap-10  w-fit  mx-auto py-5 px-10 lg:px-8 2xl:px-0"
        >
          {/* All data cards listed when filter & category values is empty all data listed on api call */}
          {getAllProductData()}

          {/*on  Category card listed choosing dropdown value */}
          {!isVerifiedFilled &&
            getProductByCategory(categoryData) &&
            getProductByCategory(categoryData)
              ?.slice(0, visibleItem)
              .map((item) => {
                return (
                  <ContentToolCard
                    key={item.id}
                    id={item.id}
                    url={item.fields.ToolImage}
                    title={item.fields.Name}
                    description={item.fields.Description}
                    tag={item.fields.Tags}
                    link={item.fields.WebsiteLink}
                    isVerified={item.fields?.Verified}
                  />
                );
              })}

          {/* Displaying filtered data if input field has some value*/}
          {getSearchResult()}

          {/* Bookmark Tool Data */}
          {getBookMarkedProduct()}

          {/* Liked Tool Data */}
          {getLikedProduct()}

          {/* Verify Icon base filter data  */}
          {getVerifiedProduct()}

          {/* Category Page filter Data base on url last pathname */}
          {isFromUrl &&
            categoryData !== undefined &&
            categoryData?.slice(0, visibleItem).map((item: AirtableModel) => {
              return (
                <ContentToolCard
                  key={item.id}
                  id={item.id}
                  url={item.fields.ToolImage}
                  title={item.fields.Name}
                  description={item.fields.Description}
                  tag={item.fields.Tags}
                  link={item.fields.WebsiteLink}
                  isVerified={item.fields?.Verified}
                />
              );
            })}

          <LoadingSpinner />
        </main>
      )}

      {/* No Search Result Found */}
      <NoResultFound />

      {/* Load More Button for Category Base Dropdown Value  */}
      {(isFromUrl &&
        categoryData !== undefined &&
        visibleItem < categoryData!.length && (
          <div onClick={loadMore}>
            <Button
              value={`Load More Category ${categoryData!.length - visibleItem}`}
            />
          </div>
        )) ||
        (getProductByCategory(categoryData) &&
          !(getProductByCategory(categoryData)!.length === visibleItem) &&
          visibleItem < getProductByCategory(categoryData)!.length && (
            <div onClick={loadMore}>
              <Button
                value={`Load More Category ${
                  getProductByCategory(categoryData)!.length - visibleItem
                }`}
              />
            </div>
          ))}

      {/* LoadMore btn will be replaced by pagination */}
      {/* Load More Button for Filter/Search Base  Value  */}
      {visibleItem < filterData?.length && (
        <div onClick={loadMore}>
          <Button
            value={`Load More Filter ${filterData?.length - visibleItem}`}
          />
        </div>
      )}

      {isVerifiedFilled && visibleItem < verifiedTool()?.length && (
        <div onClick={loadMore}>
          <Button
            value={`Load More Verified Tool's ${
              verifiedTool()?.length - visibleItem
            }`}
          />
        </div>
      )}

      {/* Load More Button for All Data */}
      <LoadMoreBtn />
    </>
  );
  function LoadMoreBtn() {
    return (
      <>
        {visibleItem <= apiData?.length &&
          !isFromUrl &&
          !isVerifiedFilled &&
          (getProductByCategory(categoryData) === null ||
            getProductByCategory(categoryData)!.length === 0) &&
          filterData?.length === 0 && (
            <div onClick={loadMore}>
              <Button
                value={`Load More All ${apiData?.length - visibleItem}`}
              />
            </div>
          )}
      </>
    );
  }

  function NoResultFound() {
    return (
      <>
        {filterData === null && (
          <div>
            <h1 className="text-3xl font-bold  text-center">
              {" "}
              No search result found
            </h1>
          </div>
        )}{" "}
      </>
    );
  }

  function LoadingSpinner() {
    return (
      <>
        {" "}
        {!apiData && !filterData && !categoryData && !isFromUrl && <Loader />}
      </>
    );
  }

  function getAllProductData() {
    return (
      <>
        {filterData?.length <= 0 &&
          categoryData?.length <= 0 &&
          !isVerifiedFilled &&
          !isBookMarkFilled &&
          !islikeFilled &&
          apiData &&
          apiData.slice(0, visibleItem).map((item: AirtableModel) => {
            if (item?.fields?.Description?.trim() !== "") {
                     return (
                <ContentToolCard
                  key={item.id}
                  id={item.id}
                  url={item.fields.ToolImage}
                  title={item.fields.Name}
                  description={item.fields.Description}
                  tag={item.fields.Tags}
                  link={item.fields.WebsiteLink}
                  isVerified={item.fields?.Verified}
                />
              );
            }
          })}
      </>
    );
  }

  function getVerifiedProduct() {
    return <> {isVerifiedFilled && verifiedTool().slice(0, visibleItem)}</>;
  }

  function getSearchResult() {
    return (
      <>
        {filterData?.length > 0 &&
          !isVerifiedFilled &&
          filterData.slice(0, visibleItem).map((item: AirtableModel) => {
            if (item?.fields?.Description?.trim() !== "") {
              // console.log(item);
              return (
                <ContentToolCard
                  key={item.id}
                  id={item.id}
                  url={item.fields.ToolImage}
                  title={item.fields.Name}
                  description={item.fields.Description}
                  tag={item.fields.Tags}
                  link={item.fields.WebsiteLink}
                  isVerified={item.fields?.Verified}
                />
              );
            }
          })}
      </>
    );
  }

  function getBookMarkedProduct() {
    return (
      <>
        {isBookMarkFilled &&
          apiData
            .filter((item: AirtableModel) => {
              for (let index = 0; index < bookMarkedTool.length; index++) {
                const bookMarkData = bookMarkedTool[index];
                if (bookMarkData.product_id === item?.id) {
                  return item;
                }
              }
              return false;
            })
            .map((item: AirtableModel) => (
              <ContentToolCard
                key={item.id} // Add a unique key for each item in the array
                id={item.id}
                url={item.fields.ToolImage}
                title={item.fields.Name}
                description={item.fields.Description}
                tag={item.fields.Tags}
                link={item.fields.WebsiteLink}
                isVerified={item.fields?.Verified}
              />
            ))}
      </>
    );
  }

  function getLikedProduct() {
    return (
      <>
        {islikeFilled &&
          apiData
            .filter((item: AirtableModel) => {
              for (let index = 0; index < likedTool.length; index++) {
                const likedData = likedTool[index];
                if (likedData.product_id === item?.id) {
                  return item;
                }
              }
              return false;
            })
            .map((item: AirtableModel) => (
              <ContentToolCard
                key={item.id} // Add a unique key for each item in the array
                id={item.id}
                url={item.fields.ToolImage}
                title={item.fields.Name}
                description={item.fields.Description}
                tag={item.fields.Tags}
                link={item.fields.WebsiteLink}
                isVerified={item.fields?.Verified}
              />
            ))}
      </>
    );
  }
}
