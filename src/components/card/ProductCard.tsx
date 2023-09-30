"use client";
import React, { useCallback, useEffect } from "react";
import AirtableModel from "@/models/airtableModel";
import CTAButton from "../button/CTAButton";
import { useApiDataContext } from "@/lib/productContext";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import { useSearchParams } from "next/navigation";
import { useVerifiedToolContextData } from "@/lib/verifiedToolContext";
import { ContentToolCard } from "./ContentToolCard";


export default function ProudctCard({ filterData, categoryData, isFromUrl = false }: any) {
  console.log('check categoryData:-', categoryData,)
  const { apiData } = useApiDataContext();
  const { isVerifiedFilled, setIsVerifiedFilled } =
    useVerifiedToolContextData();
  const { visibleItem, setVisibleItem } = useVisibleItemContextData();
  const id = useSearchParams().get("id");

  async function loadMore() {
    if (
      (isFromUrl && categoryData !== undefined) && visibleItem < categoryData!.length
    ) {
      setVisibleItem(visibleItem + 9);
    }
    if (
      !isFromUrl && getProductByCategory(categoryData) !== null &&
      visibleItem < getProductByCategory(categoryData)!.length
    ) {
      setVisibleItem(visibleItem + 9);
    }
    if (visibleItem < filterData!.length || visibleItem < apiData?.length) {
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

  useEffect(() => {
    getProductByCategory(categoryData);
    console.log('card visibleItem:::::::', (visibleItem));
  }, [filterData, categoryData, visibleItem, getProductByCategory]);

  return (
    <>
      <main
        className="grid grid-cols-1 gap-y-6 md:grid-cols-2  md:gap-8 lg:grid-cols-3 
      lg:gap-10  w-fit  mx-auto py-5 px-10 lg:px-8 2xl:px-0"
      >
        {/* All data cards listed when filter & category values is empty all data listed on api call */}
        {filterData?.length <= 0 &&
          categoryData?.length <= 0 &&
          !isVerifiedFilled &&
          apiData &&
          apiData.slice(0, visibleItem).map((item: AirtableModel) => {
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

        {/* Verify Icon base filter data  */}
        {isVerifiedFilled && apiData.filter((item: AirtableModel) => item.fields.Verified).map((item: AirtableModel) => (
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
        ))}

        {/* Category Page filter Data base on url last pathname */}
        {isFromUrl && categoryData !== undefined && categoryData?.slice(0, visibleItem).map((item: AirtableModel) => {
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

        {!apiData && (
          <div>
            <h1 className="text-3xl text-center font-bold">Loading....</h1>
          </div>
        )}
      </main>
      {filterData === null && (
        <div>
          <h1 className="text-3xl font-bold  text-center">
            {" "}
            No search result found
          </h1>
        </div>
      )}


      {/* Load More Button for Category Base Dropdown Value  */}
      {(isFromUrl && categoryData !== undefined) && visibleItem < categoryData!.length && (
        <div onClick={loadMore}>
          <CTAButton
            value={`Load More Category ${categoryData!.length - visibleItem
              }`}
          />
        </div>
      )
        ||
        (getProductByCategory(categoryData) &&
          !(getProductByCategory(categoryData)!.length === visibleItem) &&
          visibleItem < getProductByCategory(categoryData)!.length) && (
          <div onClick={loadMore}>
            <CTAButton
              value={`Load More Category ${
                getProductByCategory(categoryData)!.length - visibleItem
              }`}
            />
          </div>
        )}


      {/* Load More Button for Filter/Search Base  Value  */}
      {visibleItem < filterData?.length && (
        <div onClick={loadMore}>
          <CTAButton
            value={`Load More Filter ${filterData?.length - visibleItem}`}
          />
        </div>
      )}
      {/* Load More Button for All Data */}
      {visibleItem <= apiData?.length && !isFromUrl && !isVerifiedFilled &&
        (getProductByCategory(categoryData) === null ||
          getProductByCategory(categoryData)!.length === 0) &&
        filterData?.length === 0 && (
          <div onClick={loadMore}>
            <CTAButton
              value={`Load More All ${apiData?.length - visibleItem}`}
            />
          </div>
        )}
    </>
  );
}

