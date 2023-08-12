"use client";
import React, { useEffect, useState } from "react";
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

export default function ProudctCard() {
  const [visibleItem, setVisibleItem] = useState(9);
  const { apiData } = useApiDataContext();

  // useEffect(() => {}, [apiData]);

  async function loadMore() {
    setVisibleItem(visibleItem + 9);
  }

  return (
    <>
      <main
        className="grid grid-cols-1 gap-y-6 md:grid-cols-2  md:gap-8 lg:grid-cols-3 
      lg:gap-10  w-fit  mx-auto py-5 px-10 lg:px-14 2xl:px-0"
      >
        {apiData &&
          apiData.slice(0, visibleItem).map((item: AirtableModel) => {
            if (item?.fields?.Description?.trim() !== "") {
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

        {!apiData ||
          (apiData.length == 0 && (
            <div>
              <h1 className="text-3xl text-center font-bold">Loading....</h1>
            </div>
          ))}
      </main>
      {apiData !== undefined && visibleItem <= apiData.length && (
        <div onClick={loadMore}>
          <CTAButton />
        </div>
      )}
    </>
  );
}

function CardContainer({ id, url, title, description, tag, link }: Product) {
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
