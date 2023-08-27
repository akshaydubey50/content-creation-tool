"use client";
import React from "react";
import BreadCrumb from "../breadcrumb/breadcrumb";
import Image from "next/image";
import { BsBookmark } from "react-icons/bs";
import { Product } from "@/types/product";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";


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
        lg:flex-row my-12"
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
          <div className="aftl-right-section  lg:w-2/5 ">
            <div className="flex flex-col flex-1 space-y-4 mb-6 ">
              <h1 className="text-Heading-Medium md:text-Heading-Large font-bold">
                {title}
              </h1>
              <p className="ml-0 text-Description">{description}</p>
            </div>
            <div
              className="aftl-category   flex flex-1 text-xl space-x-4 "
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
          className="flex justify-between  items-center text-white lg:w-1/2"
        >
          <div className="flex rounded-full font-semibold bg-DarkOrange items-center justify-around  md:text-2xl px-4 md:px-6  md:py-4 space-x-4 w-4/5 py-2">
            <Link
              href={link}
              target="_blank"
              className="flex-1 text-center"
            >
              Visit Website
            </Link>
            <div className="">
              <FiArrowUpRight className="text-white text-2xl md:text-4xl " />
            </div>
          </div>
          <div className=" ml-auto">
            <BsBookmark className=" text-black text-2xl md:text-4xl " />
          </div>
        </div>
      </main>
    </>
  );
}
