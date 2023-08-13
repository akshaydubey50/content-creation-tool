"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { BsBookmark } from "react-icons/bs";
import Link from "next/link";
import AirtableModel from "@/models/airtableModel";
import CTAButton from "../button/CTAButton";
import { useApiDataContext } from "@/lib/productContext";

type Product = {
  id: string;
  url: string;
  title: string;
  description: string;
  tag: string;
  link: string;
};

export default function ProudctCard({ filterData, categoryData }: any) {
  const [visibleItem, setVisibleItem] = useState(9);
  const { apiData } = useApiDataContext();
  console.log('ProductCard filterdata>>>', filterData);

  async function loadMore() {
    if (getProductByCategory() !== null && visibleItem < getProductByCategory()!.length) {
      setVisibleItem(visibleItem + 9);
    }
    if (visibleItem < filterData!.length || visibleItem < apiData?.length) {
      setVisibleItem(visibleItem + 9);
    }
  }

  console.log('Product Category>>>>', categoryData)
  console.log('filterData', filterData, 'categoryData', categoryData, 'apiData', apiData);

  useEffect(() => {
    getProductByCategory();
    // if (getProductByCategory() !== null) {
    //   setVisibleItem(getProductByCategory()!.length < 9 ? getProductByCategory()!.length : 9)
    // }
  }, [filterData, categoryData])

  const getProductByCategory = (): AirtableModel[] | null => {
    if (categoryData !== "") {
      return apiData.filter((item: AirtableModel) => {
        if (item?.fields?.Tags[0] === categoryData) {
          return categoryData
        }
      })
    }
    return null;
  }

  return (
    <>
      <main
        className="grid grid-cols-1 gap-y-6 md:grid-cols-2  md:gap-8 lg:grid-cols-3 
      lg:gap-10  w-fit  mx-auto py-5 px-10 lg:px-14 2xl:px-0"
      >
        {/* All data cards listed when filter & category values is empty all data listed on api call */}
        {filterData?.length <= 0 && categoryData?.length <= 0 && apiData &&
          apiData.slice(0, visibleItem).map((item: AirtableModel) => {
            if (item?.fields?.Description?.trim() !== "") {
              // console.log(item);
              return (
                <CardContainer
                  key={item.id}
                  id={item.id}
                  url={item.fields.ToolImage[0].url}
                  title={item.fields.Name}
                  description={item.fields.Description}
                  tag={item.fields.Tags}
                  link={item.fields.WebsiteLink} 
                  />
              );
            }
          })}

        {/*on  Category card listed choosing dropdown value */}
        {
          getProductByCategory() && getProductByCategory()?.slice(0, visibleItem).map((item) => {
            return (
              <CardContainer
                key={item.id}
                id={item.id}
                url={item.fields.ToolImage[0].url}
                title={item.fields.Name}
                description={item.fields.Description}
                tag={item.fields.Tags}
                link={item.fields.WebsiteLink}
                />
            );
          })
        }

        {/* Displaying filtered data if input field has some value*/}
        {filterData?.length > 0 &&
          filterData.slice(0, visibleItem).map((item: AirtableModel) => {
            if (item?.fields?.Description?.trim() !== "") {
              // console.log(item);
              return (
                <CardContainer
                  key={item.id}
                  id={item.id}
                  url={item.fields.ToolImage[0].url}
                  title={item.fields.Name}
                  description={item.fields.Description}
                  tag={item.fields.Tags}
                  link={item.fields.WebsiteLink}
                />
              );
            }
          })}


        {filterData === null && (<div>
          <h2> No search result found</h2>
        </div>)}

        {!apiData && (
          <div>
            <h1 className="text-3xl text-center font-bold">Loading....</h1>
          </div>
        )}
      </main>

      {getProductByCategory() !== null && !(getProductByCategory()!.length === visibleItem) && visibleItem < getProductByCategory()!.length && (
        <div onClick={loadMore}>
          <CTAButton value={"Load More"} />
        </div>
      )}
      {visibleItem < filterData?.length && (
        <div onClick={loadMore}>
          <CTAButton value={"Load More"} />
        </div>
      )}
      {visibleItem <= apiData?.length && (getProductByCategory() === null || getProductByCategory()!.length === 0) && filterData?.length === 0 && (
        <div onClick={loadMore}>
          <CTAButton value={"Load More"} />
        </div>
      )}
    </>
  );
}

export function CardContainer({ id, url, title, description, tag, link }: Product) {
  const formattedTitle = title.toLowerCase().replace(/\s/g, "");
  /* .replace(/\.(?:\w+)$/, ""); */
  console.log("URL ENCOEDD:::", encodeURIComponent(title));
  return (
    <>
      <Link
        href={{
          pathname: `/tool/${formattedTitle}`,
          query: {
            id: id,
          },
        }}
        /* as={`/tool/${formattedTitle}`}
        passHref */
      >
        <div
          className="rounded-2xl max-w-sm  flex flex-col  border border-black 
        border-solid  shadow-2xl"
        >
          <section className="w-full  border-b border-black border-solid">
            <Image
              src={url}
              alt="logo banner"
              loading="lazy"
              width="400"
              height="400"
              decoding="async"
              data-nimg="1"
              className="rounded-t-xl w-full"
              //   style="color: transparent"
            />
          </section>
          <section className="bg-[#F5F5F5] py-[30px] px-[20px] rounded-b-2xl">
            <div className="pb-[15px] flex flex-1 flex-row justify-between">
              <h1 className="font-bold text-Title-Medium md:text-Title-Large">
                {title}
              </h1>
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
              className="text-white text-tags font-semibold flex 
        justify-between items-center "
            >
              <Link
                href={link}
                target="_blank"
                className="px-5 py-2 rounded-full bg-DarkOrange "
              >
                Visit Website
              </Link>
              <BsBookmark size={24} color="black" />
            </div>
          </section>
        </div>
      </Link>
    </>
  );
}
