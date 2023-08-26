"use client";
import React from "react";
import BreadCrumb from "../breadcrumb/breadcrumb";
import Image from "next/image";
import { BsBookmark } from "react-icons/bs";
import { Product } from "@/types/product";
import Link from "next/link";
import VisitWebsite from "../visit-website/VisitWebsite";

export default function ProductToolBanner({
  url,
  title,
  description,
  tag,
  link,
}: Product) {
  return (
    <>
      <main className="bg-light-gray  p-10 md:px-20 md:py-16 md:mb-12">
        <BreadCrumb tag={tag} title={title} />
        <div
          className="affiliate-tool-container  space-y-8 flex flex-col 
        lg:flex-row  lg:space-x-20 my-12"
        >
          <div
            className="aftl-left-section border border-black border-solid 
          rounded-t-xl md:xl "
          >
            <Image
              src={url}
              alt="logo bannero"
              loading="lazy"
              width="1280"
              height="720"
              decoding="async"
              data-nimg="1"
              className="rounded-t-xl w-full h-full  object-cover"
              //   style="color: transparent"
            />
          </div>
          <div className="aftl-right-section ">
            <div className="flex flex-col flex-1 space-y-4 mb-6">
              <h1 className="text-Heading-Medium md:text-Heading-Large font-bold">
                {title}
              </h1>
              <p className="ml-0 text-Description">{description}</p>
            </div>
            <div
              className="aftl-category   flex flex-1 text-xl justify-between 
            md:justify-center lg:justify-start   md:space-x-20"
            >
              <div
                className=" rounded-full bg-white border border-solid
               border-black text-center"
              >
                <button className=" px-10 md:px-16 py-2 font-bold ">
                  {tag}
                </button>
              </div>
              <div
                className="rounded-full  bg-gray-400 text-white border border-solid
               border-black text-center"
              >
                <button className="px-10 md:px-16 py-2 font-bold ">Free</button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex justify-between md:justify-center md:space-x-20 
        lg:justify-between   lg:w-1/3 lg:space-x-0 lg:pr-10 items-center text-white"
        >
           <VisitWebsite url={link} />
         
          <BsBookmark size={24} color="black" />
        </div>
      </main>
    </>
  );
}
