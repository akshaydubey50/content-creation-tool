"use client";
import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import Image from "next/image";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Product } from "@/types/product";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import LikedBookmarkModal from "@/components/modal/LikedBookmarkModal";
import {
  deleteBookmark,
  addBookmark,
} from "@/redux/slice/bookmark/bookmarkSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { isProductBookmarked } from "@/helper/helper";
import { MdVerified } from "react-icons/md";
import { useSession } from "next-auth/react";
import { HomePage } from "@/constants/RoutePath";

export default function ProductToolBanner({
  url,
  title,
  description,
  tag,
  link,
  id,
  verified,
}: Product) {
  const [isOpen, setIsOpen] = useState(false);
  const bookmarkList = useSelector(
    (state: RootState) => state.bookmark.bookmarkList
  );
  // const [isBookMarked, setIsBookMarked] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(() =>
    isProductBookmarked(id, bookmarkList)
  );

  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const DEBOUNCE_DELAY = 250; // ms

  const handleBookmark = useCallback(() => {
    if (!session || !session?.user) {
      setIsOpen(true);
      return;
    }
    setIsBookMarked(!isBookMarked);
    const action = isBookMarked ? deleteBookmark : addBookmark;
    // @ts-ignore
    dispatch(action(id));
  }, [session, isBookMarked, id, dispatch]);

  function debounce(func: Function, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedHandleBookmark = useCallback(
    debounce(handleBookmark, DEBOUNCE_DELAY),
    [handleBookmark]
  );

  const formattedTag = tag[0].toLowerCase().replace(/\s/g, "-");

  const goToCategory = () => {
    router.push(`${HomePage}/category/${formattedTag}`);
  };

  useEffect(() => {
    setIsBookMarked(isProductBookmarked(id, bookmarkList));
  }, [id, bookmarkList]);

  return (
    <>
      <main className="bg-light-gray   p-10  md:py-16 md:mb-12  overflow-x-hidden">
        <div className="max-w-7xl mx-auto pt-10">
          <Breadcrumb tag={tag} title={title} />
          <div className="grid grid-cols-12 gap-8 my-4">
          {/* image */}
            <div className="col-span-12 lg:col-span-6 border border-black border-solid 
          rounded-t-xl">
              <Image
                src={url}
                alt="logo bannero"
                loading="lazy"
                width="1280"
                height="720"
                decoding="async"
                data-nimg="1"
                className="rounded-t-xl  h-full  object-cover"
              />
          </div>
          {/* content */}
            <div className="col-span-12  lg:col-span-6">
              <div className="flex flex-col flex-1 space-y-4  mb-6 sm:mt-4 lg:mt-0 ">
                <div className="flex items-center  justify-between">
                  <div className="flex gap-2 items-center">
                    <h1 className="text-Title-Large xl:text-Heading-Large font-bold">
                      {title}
                    </h1>
                    {verified && (
                      <MdVerified className="text-2xl text-DarkOrange" />
                    )}
                  </div>
                  <div className="mt-2">
                    <button
                      title="Bookmark"
                      type="button"
                      onClick={debouncedHandleBookmark}
                    >
                      {isBookMarked ? (
                        <BsBookmarkFill className="text-xl md:text-2xl xl:text-3xl text-DarkOrange" />
                      ) : (
                        <BsBookmark className="text-xl md:text-2xl xl:text-3xl   text-black" />
                      )}
                    </button>{" "}
                  </div>
                  {isOpen && (
                    <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />
                  )}
                </div>
                <p className="ml-0 text-Title-Large xl:text-Description-Large">
                  {description}
                </p>
              </div>
              <p className="mb-4 ">
                <span className="text-Title-Large md:text-lg font-semibold">Categories</span> :  
                <span className="">
                  {` ${tag?.join(" , ")}`}
                  </span>
              </p>
              <div className="flex justify-start space-x-4 pt-6 items-center text-white  max-w-lg">
                <div className="text-white text-2xl  hover:text-DarkOrange">
                  <Link
                    href={link}
                    target="_blank"
                    className=" hover:bg-white  border border-DarkOrange flex rounded-md font-semibold bg-DarkOrange items-center justify-around  text-sm lg:text-lg px-4 space-x-2  py-2"
                  >
                    <p className="flex-1 text-center">Visit Website</p>
                    <div>
                      <FiArrowUpRight className="text-2xl hover:text-DarkOrange" />
                    </div>
                  </Link>
                </div>
                <div
                  className="rounded-lg  bg-white    text-DarkOrange border 
               border-DarkOrange hover:bg-DarkOrange hover:text-white text-center"
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
