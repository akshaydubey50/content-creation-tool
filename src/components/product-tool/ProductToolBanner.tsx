"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import Image from "next/image";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Product } from "@/types/product";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import LikedBookmarkModal from "@/components/modal/LikedBookmarkModal";
import { deleteBookmark, addBookmark } from "@/lib/slice/bookmarkSlice";
import { useRouter } from "next/navigation";
import {  useDispatch, useSelector } from "react-redux";
import {  RootState } from "@/lib/store";
import { isProductBookmarked } from "@/helper/helper";
import { MdVerified } from "react-icons/md";


export default function ProductToolBanner({
  url,
  title,
  description,
  tag,
  link,
  id, verified
}: Product) {
  const [isOpen, setIsOpen] = useState(false);
  const bookmarkList =useSelector((state:RootState)=>state.bookmark.bookmarkList)
  // const [isBookMarked, setIsBookMarked] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(() =>
    isProductBookmarked(id, bookmarkList)
  );
  
  const router = useRouter();
  const dispatch = useDispatch();

  const userAuthData = useSelector(
    (store: RootState) => store.user.userSession
  );

  const handleBookMark = () => {

    if (!userAuthData) {
      setIsOpen(true)
    }
    else{
      if (isBookMarked && id) {
        // @ts-ignore
        dispatch(deleteBookmark(id));
        setIsBookMarked(!isBookMarked);
      } else {
        // @ts-ignore
        dispatch(addBookmark(id));
        setIsBookMarked(!isBookMarked);
      }
    }

    setIsBookMarked(!isBookMarked);
  };
  const formattedTag = tag[0].toLowerCase().replace(/\s/g, "-");

  const goToCategory = () => {
    router.push(`/category/${formattedTag}`);
  };

  useEffect(() => {
    setIsBookMarked(isProductBookmarked(id, bookmarkList));
  }, [setIsBookMarked, isBookMarked, id, bookmarkList]);
  return (
    <>
      <main className="bg-light-gray   p-10 md:px-10 md:py-16 md:mb-12 xl:px-10-percent ">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb tag={tag} title={title} />
          <div
            className="affiliate-tool-container   space-y-8 flex flex-col 
        lg:flex-row my-12"
          >
            {/* Image Container */}
            <div
              className="aftl-left-section   xl:w-45%"
            >
              <div className="border border-black border-solid 
          rounded-t-xl">
                <Image
                  src={url}
                  alt="logo bannero"
                  loading="lazy"
                  width="1280"
                  height="720"
                  decoding="async"
                  data-nimg="1"
                  className="rounded-t-xl w-full h-full  object-cover"
                />
              </div>

              <div className="flex justify-between pt-6 items-center text-white  max-w-7xl">
                <div className="basis-2/5">
                  <Link
                    href={link}
                    target="_blank"
                    className="flex rounded-full font-semibold bg-DarkOrange items-center justify-around  md:text-xl px-4 md:px-4  md:py-3 space-x-4  py-2"
                  >
                    <p className="flex-1 text-center">Visit Website</p>
                    <div>
                      <FiArrowUpRight className="text-white text-2xl md:text-3xl  " />
                    </div>
                  </Link>
                </div>
                <div className="ml-auto">
                  <button title="Bookmark" type="button" onClick={handleBookMark}>
                    {isBookMarked ? (
                      <BsBookmarkFill className="text-4xl text-DarkOrange" />
                    ) : (
                      <BsBookmark className="text-4xl   text-black" />
                    )}
                  </button>{" "}
                </div>
                {isOpen && (
                  <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />
                )}
              </div>

            </div>

            <div className="aftl-right-section  xl:w-30%">
              <div className="flex flex-col flex-1 space-y-4 mb-6 ">
                <div className="flex gap-8 items-center">
                  <h1 className="text-Heading-Medium md:text-Heading-Large font-bold">
                    {title}
                  </h1>
                  {verified && (
                    <MdVerified className="text-4xl text-DarkOrange" />
                  )}
                </div>
                <p className="ml-0 text-Description lg:text-Description-Large">
                  {description}
                </p>
              </div>
              <div className="aftl-category   flex flex-1 text-xl space-x-4 ">
                <div
                  className=" rounded-full bg-white border border-solid
               border-black text-center cursor-pointer hover:bg-DarkOrange hover:text-white hover:border-DarkOrange"
                >
                  <button
                    className="text-sm px-6 py-2 md:px-10 md:py-2 font-bold w-fit"
                    onClick={goToCategory}
                  >
                    {tag}
                  </button>
                </div>
                <div
                  className="rounded-full  bg-gray-400 text-white border border-solid
               border-black text-center"
                >
                  <button className="text-sm px-6 py-2 md:px-10 md:py-2 font-bold w-fit">
                    Free
                  </button>
                </div>
              </div>
            </div>
          </div>

      </div>
      </main>
    </>
  );
}
