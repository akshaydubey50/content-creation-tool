"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsBookmark } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";
import AirtableModel from "@/models/airtableModel";
import CTAButton from "../button/CTAButton";
import { Product } from "@/types/product";

export default function ProudctCard() {
  const [visibleItem, setVisibleItem] = useState(9);
  const [data, setData] = useState<AirtableModel[]>();
  const url: any = [];
  async function fetchData() {
    const response = await axios.get("/api/airtable");
    setData(response.data.filterData);
    data?.map((item: AirtableModel) => {
      url.push(item.fields.WebsiteLink);
    });
    // console.log("response", data);
    console.log("urLs:", url);
    if (data == undefined || data == null) {
      const response = await axios.get("/api/airtable");
      setData(response.data.filterData);

      console.log("response", data);
      // console.log("response", data![0]["fields"]["WebsiteLink"]);
      // setUrlLink(data![0]["fields"]["WebsiteLink"]);
    }
    /*  if (typeof window === "undefined") {
        // Server-side rendering
        return null;
      } */
  }
  useEffect(() => {
    fetchData();
  }, [visibleItem, data]);

  async function loadMore() {
    setVisibleItem(visibleItem + 9);
  }

  return (
    <>
      <main
        className="px-[30px] lg:px-[100px] grid grid-cols-1 gap-y-5 md:grid-cols-2  
      md:gap-x-6 md:gap-y-5 lg:grid-cols-3 lg:gap-x-10   justify-center my-[20px]"
      >
        {data &&
          data.slice(0, visibleItem).map((item) => {
            if (item?.fields?.Description?.trim() !== "") {
              return (
                <CardContainer
                  key={item.id}
                  img=""
                  title={item.fields.Name}
                  description={item.fields.Description}
                  tag={item.fields.Tags}
                  link={item.fields.WebsiteLink}
                />
              );
            }
          })}

        {!data && (
          <div>
            <h1 className="text-3xl text-center font-bold">Loading....</h1>
          </div>
        )}
      </main>
      {visibleItem <= data?.length && (
        <div onClick={loadMore}>
          <CTAButton />
        </div>
      )}
    </>
  );
}

function CardContainer({ img, title, description, tag, link }: Product) {
  return (
    <>
      <Link href="/tool-details">
        <div className="rounded-2xl max-w-sm  flex flex-col  border border-black border-solid  shadow-2xl ">
          <section className="w-full  border-b border-black border-solid">
            <Image
              alt="logo banner"
              loading="lazy"
              width="400"
              height="400"
              decoding="async"
              data-nimg="1"
              className="rounded-t-xl w-full"
              // src={img}
              src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Ff7d95ad62eb920e10e24d9622cace8f1.cdn.bubble.io%2Ff1679057707435x141688706130410850%2Fai-copywriting-copy.ai.png?w=768&h=407&auto=enhance&dpr=1&q=100&fit=max"
              //   style="color: transparent"
            />
          </section>
          <section className="bg-[#F5F5F5] py-[30px] px-[20px] rounded-b-2xl">
            <div className="pb-[15px] flex flex-1 flex-row justify-between">
              <h1 className="font-bold text-lg md:text-2xl">{title}</h1>
              <h1>👍 1</h1>
            </div>
            <article className="text-sm md:text-xl">
              <p>{description}</p>
              <button className="bg-white rounded-full border border-solid border-black my-6 px-4 py-1">
                {tag}
              </button>
            </article>
            <div
              className="text-white font-semibold flex 
        justify-between items-center text-sm md:text-xl"
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
