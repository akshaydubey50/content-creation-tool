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
      <main className="bg-light-gray py-6 px-8   md:p-10 md:py-16 md:mb-12 overflow-x-hidden">
        <div className="max-w-7xl mx-auto pt-14">
          <Breadcrumb tag={tag} title={title} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 my-4">
            <div className="lg:col-span-6 border border-black border-solid rounded-t-xl">
              <Image
                src={url}
                alt="logo banner"
                loading="lazy"
                width={1280}
                height={720}
                className="rounded-t-xl w-full h-auto object-cover"
              />
            </div>
            <div className="lg:col-span-6">
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    {/* Responsive text sizes for the title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold break-words">
                      {title}
                    </h1>
                    {verified && <MdVerified className="text-xl sm:text-2xl text-DarkOrange" />}
                  </div>
                  <button
                    title="Bookmark"
                    type="button"
                    onClick={debouncedHandleBookmark}
                    className="flex-shrink-0"
                  >
                    {isBookMarked ? (
                      <BsBookmarkFill className="text-xl sm:text-2xl xl:text-3xl text-DarkOrange" />
                    ) : (
                      <BsBookmark className="text-xl sm:text-2xl xl:text-3xl text-black" />
                    )}
                  </button>
                </div>
                <p className="text-sm sm:text-base md:text-lg xl:text-xl break-words">
                  {description}
                </p>
              </div>
              <p className="mb-4 text-sm sm:text-base md:text-lg">
                <span className="font-semibold">Categories</span>:
                <span className="break-words">{` ${tag?.join(", ")}`}</span>
              </p>
              <div className="flex flex-col sm:flex-row justify-start space-y-2 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 items-center text-white">
                <Link
                  href={link}
                  target="_blank"
                  className="w-full sm:w-auto hover:bg-white hover:text-DarkOrange border border-DarkOrange flex rounded-md font-semibold bg-DarkOrange items-center justify-center text-sm lg:text-base px-4 py-2 space-x-2"
                >
                  <span>Visit Website</span>
                  <FiArrowUpRight className="text-xl" />
                </Link>
                <button className="w-full sm:w-auto rounded-lg bg-white text-DarkOrange border border-DarkOrange hover:bg-DarkOrange hover:text-white text-center text-sm px-6 py-2 md:px-10 md:py-2 font-bold">
                  Free
                </button>
              </div>
            </div>
          </div>
        </div>
        {isOpen && <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      </main>
    </>
  );
}
