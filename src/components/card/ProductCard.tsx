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
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import LikedBookmarkModal from "../modal/LikedBookmarkModal";

type Product = {
  id: string;
  url: string;
  title: string;
  description: string;
  tag: string;
  link: string;
  isVerified: boolean
};
export default function ProudctCard({ filterData, categoryData, isFromUrl = false }: any) {
  console.log('check categoryData:-', categoryData,)
  const { apiData } = useApiDataContext();
  const { isVerifiedFilled, setIsVerifiedFilled } = useVerifiedToolContextData();
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
                  isVerified={item.fields?.Verified}
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
                  isVerified={item.fields?.Verified}
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
                  isVerified={item.fields?.Verified}

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
            isVerified={item.fields?.Verified}
          />
        ))}

        {/* Category Page filter Data base on url last pathname */}
        {isFromUrl && categoryData !== undefined && categoryData?.slice(0, visibleItem).map((item: AirtableModel) => {
          return (
            <CardContainer
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

export function CardContainer({
  id,
  url,
  title,
  description,
  tag,
  link,
  isVerified = false
}: Product) {
  // console.log('url>>>',url)
  const formattedTitle = title.toLowerCase().replace(/\s/g, "-");
  const [isBookMarked, setIsBookMarked] = useState(false);
  const { isVerifiedFilled } = useVerifiedToolContextData();
  const [likedTool, setLikedTool] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const formattedTag = tag[0].toLowerCase().replace(/\s/g, "-");
  const handleBookMark = () => {
    setIsOpen(true);
    setIsBookMarked(!isBookMarked);
    // console.log(' @@ bookmark', isBookMarked)
  }

  const handleLikedTool = () => {
    setIsOpen(true);
    setLikedTool(!likedTool);
    // console.log(' @@ likedTool', likedTool)
  }

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
        <section className="bg-light-gray pt-7 px-5 rounded-b-2xl h-full">
          <div className="flex flex-col justify-between h-full">
            <div className="">
              <div className="pb-4 flex flex-1 flex-row justify-between">
                <div className="flex items-center gap-x-2">
                  <h1 className="font-bold text-Title-Medium md:text-Title-Large">
                    {title}
                  </h1>

                  {isVerified && <MdVerified className="text-2xl text-DarkOrange" />}
                </div>
                <button title="Bookmark" type="button" onClick={handleLikedTool} className="flex items-center gap-x-1">
                  <p>
                    {likedTool ? (<AiFillHeart className="text-3xl text-DarkOrange" />
                    ) : (<AiOutlineHeart className="text-3xl   text-black" />)}
                  </p>
                  <p className="">1</p>
                </button>
                {isOpen && <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />}
              </div>
              <div className="text-Description">
                <p>{description}</p>
              </div>
            </div>
            <div className="tool-btn-section pb-7">
              <p className="my-6 ">
                <Link className=" bg-white rounded-full  text-tags font-medium border 
              border-solid border-black px-5 py-1"
                  href={`/category/${formattedTag}`}
                  prefetch={true}
                >
                  {tag}
                </Link>
              </p>
              <div
                className="text-white text-Title-Medium  flex 
        justify-between items-center"
              >
                <VisitWebsite url={link} />
                <button title="Bookmark" type="button" onClick={handleBookMark}>
                  {isBookMarked ? (<BsBookmarkFill className="text-3xl text-DarkOrange" />
                  ) : (<BsBookmark className="text-3xl   text-black" />)}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
