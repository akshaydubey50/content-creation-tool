"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import AirtableModel from "@/models/airtableModel";
import CTAButton from "../button/CTAButton";
import { useApiDataContext } from "@/lib/productContext";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import VisitWebsite from "../visit-website/VisitWebsite";
import { useSearchParams } from "next/navigation";
import { useVerifiedToolContextData } from "@/lib/verifiedToolContext";

type Product = {
  id: string;
  url: string;
  title: string;
  description: string;
  tag: string;
  link: string;
};
export default function ProudctCard({ filterData, categoryData }: any) {
  const { apiData } = useApiDataContext();
  const { isVerifiedFilled, setIsVerifiedFilled } = useVerifiedToolContextData();
  const { visibleItem, setVisibleItem } = useVisibleItemContextData();
  const id = useSearchParams().get("id");

  async function loadMore() {
    if (
      getProductByCategory(categoryData) !== null &&
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
    [apiData]
  );

  useEffect(() => {
    getProductByCategory(categoryData);
  }, [filterData, categoryData, visibleItem, getProductByCategory]);

  return (
    <>
      <main
        className="grid grid-cols-1 gap-y-6 md:grid-cols-2  md:gap-8 lg:grid-cols-3 
      lg:gap-10  w-fit  mx-auto py-5 px-10 lg:px-8 2xl:px-0"
      >
        {/* All data cards listed when filter & category values is empty all data listed on api call */}
        {filterData?.length <= 0 &&
          categoryData?.length <= 0 && !isVerifiedFilled &&
          apiData &&
          apiData.slice(0, visibleItem).map((item: AirtableModel) => {
            if (item?.fields?.Description?.trim() !== "") {
              // console.log(item);
              return (
                <CardContainer
                  key={item.id}
                  id={item.id}
                  url={item.fields.ToolImage}
                  title={item.fields.Name}
                  description={item.fields.Description}
                  tag={item.fields.Tags}
                  link={item.fields.WebsiteLink}
                />
              );
            }
          })}

        {/*on  Category card listed choosing dropdown value */}
        {!isVerifiedFilled && getProductByCategory(categoryData) &&
          getProductByCategory(categoryData)
            ?.slice(0, visibleItem)
            .map((item) => {
              return (
                <CardContainer
                  key={item.id}
                  id={item.id}
                  url={item.fields.ToolImage}
                  title={item.fields.Name}
                  description={item.fields.Description}
                  tag={item.fields.Tags}
                  link={item.fields.WebsiteLink}
                />
              );
            })}

        {/* Displaying filtered data if input field has some value*/}
        {filterData?.length > 0 && !isVerifiedFilled &&
          filterData.slice(0, visibleItem).map((item: AirtableModel) => {
            if (item?.fields?.Description?.trim() !== "") {
              // console.log(item);
              return (
                <CardContainer
                  key={item.id}
                  id={item.id}
                  url={item.fields.ToolImage}
                  title={item.fields.Name}
                  description={item.fields.Description}
                  tag={item.fields.Tags}
                  link={item.fields.WebsiteLink}
                />
              );
            }
          })}

        {/* Verify Icon base filter data  */}
        {isVerifiedFilled && apiData.filter((item: AirtableModel) => item.fields.Verified).map((item: AirtableModel) => (
          <CardContainer
            key={item.id}
            id={item.id}
            url={item.fields.ToolImage}
            title={item.fields.Name}
            description={item.fields.Description}
            tag={item.fields.Tags}
            link={item.fields.WebsiteLink}
          />
        ))}
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
      {getProductByCategory(categoryData) !== null &&
        !(getProductByCategory(categoryData)!.length === visibleItem) &&
        visibleItem < getProductByCategory(categoryData)!.length && (
          <div onClick={loadMore}>
            <CTAButton
              value={`Load More Category ${getProductByCategory(categoryData)!.length - visibleItem
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
      {visibleItem <= apiData?.length && !isVerifiedFilled &&
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

export function CardContainer({
  id,
  url,
  title,
  description,
  tag,
  link,
}: Product) {
  // console.log('url>>>',url)
  const formattedTitle = title.toLowerCase().replace(/\s/g, "");
  const [isBookMarked, setIsBookMarked] = useState(false);
  const { isVerifiedFilled } = useVerifiedToolContextData();

  const handleBookMark = () => {
    setIsBookMarked(!isBookMarked);
    console.log(' @@ bookmark', isBookMarked)
  }

  /* .replace(/\.(?:\w+)$/, ""); */
  // console.log("URL ENCOEDD:::", encodeURIComponent(title));
  return (
    <>

      <div
        className="rounded-2xl max-w-sm  flex flex-col  border border-black 
        border-solid  shadow-2xl"
      >
        <Link
          href={{
            pathname: `/tool/${formattedTitle}`,
            query: {
              id: id,
            },
          }}
        >
          <section className="  border-b border-black border-solid">
            <Image
              src={url}
              alt="logo banner"
              loading="lazy"
              width="1280"
              height="720"
              decoding="async"
              data-nimg="1"
              className="rounded-t-2xl w-full object-cover"
            //   style="color: transparent"
            />
          </section>
        </Link>
        <section className="bg-light-gray py-[30px] px-[20px] rounded-b-2xl h-full">
          <div className="pb-[15px] flex flex-1 flex-row justify-between">
           <div className="flex space-x-6 items-center">
           <h1 className="font-bold text-Title-Medium md:text-Title-Large">
              {title}
            </h1>
            {isVerifiedFilled ? <MdVerified className="text-2xl text-DarkOrange" /> :''}
           </div>
            <h1>👍 1</h1>

          </div>
          <article className="text-Description">
            <p>{description}</p>
            <button
              className="bg-white rounded-full  text-tags font-medium border 
              border-solid border-black my-6 px-4 py-1"
            >
              {tag}
            </button>
          </article>
          <div
            className="text-white text-Title-Medium  flex 
        justify-between items-center"
          >
            <VisitWebsite url={link} />
            <button title="Bookmark" type="button" onClick={handleBookMark}>
              {isBookMarked ? (<BsBookmarkFill className="text-2xl text-black" />
              ) : (<BsBookmark className="text-2xl   text-black" />)}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
