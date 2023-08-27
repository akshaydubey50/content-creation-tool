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
        lg:flex-row  lg:space-x-10 my-12"
        >
          <div
            className="aftl-left-section border border-black border-solid 
          rounded-t-xl md:xl lg:w-1/2"
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
          <div className="aftl-right-section  lg:w-1/2">
            <div className="flex flex-col flex-1 space-y-4 mb-6">
              <h1 className="text-Heading-Medium md:text-Heading-Large font-bold">
                {title}
              </h1>
              <p className="ml-0 text-Description">{description}</p>
            </div>
            <div
              className="aftl-category   flex flex-1 text-xl space-x-4"
            >
              <div
                className=" rounded-full bg-white border border-solid
               border-black text-center"
              >
                <button className="text-sm px-6 py-2 md:px-10 md:py-2 font-bold w-fit">
                  {tag}
                </button>
              </div>
              <div
                className="rounded-full  bg-gray-400 text-white border border-solid
               border-black text-center"
              >
                <button className="text-sm px-6 py-2 md:px-10 md:py-2 font-bold w-fit">Free</button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex justify-between items-center text-white"
        >
          <VisitWebsite url={link} />

          <BsBookmark size={24} color="black" />
        </div>
      </main>
    </>
  );
}
