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
import Details from "../details";

export default function ProductToolBanner({
  url,
  title,
  description,
  tag,
  link,
  id,
  verified,
  Pricing,
  detailedMsg
}: Product,) {
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
      <main className="bg-light-gray py-6 px-8   md:px-10 lg:pt-16  overflow-x-hidden">
        <div className="max-w-7xl mx-auto pt-14">
          <Breadcrumb tag={tag} title={title} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-16 my-4">
            <div className="lg:col-span-6">
              <div className="flex flex-col space-y-4 mb-6">
                  <div className="flex gap-2 items-center">
                    {/* Responsive text sizes for the title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold break-words">
                      {title}
                    </h1>
                    {verified && <MdVerified className="text-xl sm:text-2xl text-DarkOrange" />}
                  </div>
                <div className="border border-black border-solid rounded-t-xl lg:hidden">
                  <Image
                    src={url}
                    alt="logo banner"
                    loading="lazy"
                    width={1280}
                    height={720}
                    className="rounded-t-xl w-full h-auto object-cover"
                  />
                 </div>
              
                <p className="sm:text-base text-lg break-words">
                  {description}
                </p>
              </div>
           <div className="flex flex-col space-y-2">
                <p className=" text-lg md:text-base ">
                  <span className="font-semibold">Categories : </span>
                  <span className="break-words">{`${tag?.join(", ")}`}</span>
                </p>
                <p className="text-lg md:text-base">
                  <span className="font-semibold">Pricing Model : </span>
                  <span className="break-words">{`${Pricing} `}</span>
                </p>
           </div>
              <div className="flex  justify-between md:justify-start md:space-x-10  pt-4 items-stretch text-white">
                <div className="border border-DarkOrange rounded-lg py-2 px-10 flex items-center text-DarkOrange hover:bg-DarkOrange hover:text-white hover:cursor-pointer ">
                  <button
                    title="Bookmark"
                    type="button"
                    className="font-bold"
                    onClick={debouncedHandleBookmark}
                  >
                    {isBookMarked ? (
                      <BsBookmarkFill className="  sm:text-2xl md:text-lg font-bold  " />
                    ) : (
                        <BsBookmark className="  sm:text-2xl md:text-lg font-bold " />
                    )}
                  </button>
                </div>
                <div>
                <Link
                  href={link}
                  target="_blank"
                  className="w-full sm:w-auto hover:bg-white hover:text-DarkOrange border border-DarkOrange flex rounded-md font-semibold bg-DarkOrange items-center justify-center text-sm lg:text-base px-4 py-2 space-x-2"
                >
                  <span>Visit Website</span>
                  <FiArrowUpRight className="text-xl" />
                </Link>               
                </div>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-6 border border-black border-solid rounded-t-xl">
              <Image
                src={url}
                alt="logo banner"
                loading="lazy"
                width={1280}
                height={720}
                className="rounded-t-xl w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>

        {isOpen && <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      </main>
      <div className="max-w-7xl mx-auto overflow-x-hidden px-8 ">
        {detailedMsg && <Details content={detailedMsg} />}
      </div>

    </>
  );
}
