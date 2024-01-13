"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import Image from "next/image";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Product } from "@/types/product";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import LikedBookmarkModal from "@/components/modal/LikedBookmarkModal";
import { useRouter } from "next/navigation";

export default function ProductToolBanner({
  url,
  title,
  description,
  tag,
  link,
}: Product) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const router = useRouter();

  const handleBookMark = () => {
    setIsOpen(true);
    setIsBookMarked(!isBookMarked);
    // console.log(' @@ bookmark', isBookMarked)
  }
  const formattedTag = tag[0].toLowerCase().replace(/\s/g, "-");

  const goToCategory = ()=>{
    router.push(`/category/${formattedTag}`)
  }
  return (
    <>
      <main className="bg-light-gray  p-10 md:px-10 md:py-16 md:mb-12 xl:px-10-percent ">
        <Breadcrumb tag={tag} title={title} />
        <div
          className="affiliate-tool-container  space-y-8 flex flex-col 
        lg:flex-row my-12"
        >
          <div
            className="aftl-left-section border border-black border-solid 
          rounded-t-xl  xl:w-45%"
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
          <div className="aftl-right-section  xl:w-30%">
            <div className="flex flex-col flex-1 space-y-4 mb-6 ">
              <h1 className="text-Heading-Medium md:text-Heading-Large font-bold">
                {title}
              </h1>
              <p className="ml-0 text-Description lg:text-Description-Large">{description}</p>
            </div>
            <div
              className="aftl-category   flex flex-1 text-xl space-x-4 "
            >
              <div
                className=" rounded-full bg-white border border-solid
               border-black text-center cursor-pointer hover:bg-DarkOrange hover:text-white hover:border-none"
              >
                <button className="text-sm px-6 py-2 md:px-10 md:py-2 font-bold w-fit"
                onClick={goToCategory}>
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
          className="flex justify-between  items-center text-white lg:w-1/2 max-w-7xl"
        >
            <Link
              href={link}
              target="_blank"
              className="flex rounded-full font-semibold bg-DarkOrange items-center justify-around  md:text-2xl px-4 md:px-6  md:py-4 space-x-4 w-4/5 py-2"
            >
              <p className="flex-1 text-center">
                Visit Website
              </p>
            <div>
              <FiArrowUpRight className="text-white text-2xl md:text-4xl " />
            </div>
            </Link>
          <div className="ml-auto">
          <button title="Bookmark" type="button" onClick={handleBookMark}>
                  {isBookMarked ? (<BsBookmarkFill className="text-3xl text-DarkOrange" />
                  ) : (<BsBookmark className="text-3xl   text-black" />)}
                </button>          </div>
          {isOpen && <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />}

        </div>
      </main>
    </>
  );
}
