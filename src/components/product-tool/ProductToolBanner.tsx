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
} from "@/redux/slice/bookmark/bookmark.slice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { isProductBookmarked } from "@/helper/helper";
import { MdVerified } from "react-icons/md";
import { useSession } from "next-auth/react";
import { HomePage } from "@/constants/RoutePath";
import Details from "../details";
import BookmarkButton from "@/components/ui/bookmarkbutton";
import { useBookmarkHandler } from "@/hooks/useBookmarkHandler";
export default function ProductToolBanner({
  url,
  title,
  description,
  tag,
  link,
  id,
  verified,
  Pricing,
  detailedMsg,
}: Product) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlreadyBookmarked, setIsAlreadyBookmarked] = useState(false);

  const bookmarkedList = useSelector(
    (state: RootState) => state.bookmarks.bookmarkList || []
  );
  // const [isBookMarked, setIsBookMarked] = useState(false);
  // const [isBookMarked, setIsBookMarked] = useState(() =>
  //   isProductBookmarked(id, bookmarkList)
  // );

  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const DEBOUNCE_DELAY = 250; // ms


  const { isBookMarked, handleBookmark } = useBookmarkHandler(
    id,
    title,
    isAlreadyBookmarked,
    "tool"
  );
  // const handleBookmark = useCallback(() => {
  //   if (!session || !session?.user) {
  //     setIsOpen(true);
  //     return;
  //   }
  //   setIsBookMarked(!isBookMarked);
  //   const action = isBookMarked ? deleteBookmark : addBookmark;
  //   // @ts-ignore
  //   dispatch(action(id));
  // }, [session, isBookMarked, id, dispatch]);

  function debounce(func: Function, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  // const debouncedHandleBookmark = useCallback(
  //   debounce(handleBookmark, DEBOUNCE_DELAY),
  //   [handleBookmark]
  // );

  const formattedTag = tag[0].toLowerCase().replace(/\s/g, "-");

  const goToCategory = () => {
    router.push(`${HomePage}/category/${formattedTag}`);
  };

  // useEffect(() => {
  //   setIsBookMarked(isProductBookmarked(id, bookmarkList));
  // }, [id, bookmarkList]);

  // New effect for bookmarks
  useEffect(() => {
    if (bookmarkedList?.length > 0 || bookmarkedList?.length != null) {
      const toolBookmarkedItem = bookmarkedList.find(
        (item) => item.itemType === "tool"
      );
      if (toolBookmarkedItem?.itemIds != null) {
        // Check if the current id is in the itemIds array
        setIsAlreadyBookmarked(toolBookmarkedItem.itemIds.includes(id));
      } else {
        setIsAlreadyBookmarked(false);
      }
    } else {
      setIsAlreadyBookmarked(false);
    }
  }, [id, bookmarkedList]);

  return (
    <>
      <main className="px-8 py-6 overflow-x-hidden bg-light-gray md:px-10 lg:pt-16">
        <div className="mx-auto max-w-7xl pt-14">
          <Breadcrumb
            categories={"tools"}
            currentPageTitle={title}
            key={title}
          />

          <div className="grid grid-cols-1 gap-4 my-4 lg:grid-cols-12 sm:gap-6 md:gap-8">
          
            <div className="lg:col-span-6">
              <div className="flex flex-col mb-6 space-y-4">
                <div className="flex items-center gap-2">
                  {/* Responsive text sizes for the title */}
                  <h1 className="text-xl font-bold break-words sm:text-2xl md:text-3xl xl:text-4xl">
                    {title}
                  </h1>
                  {verified && (
                    <MdVerified className="text-xl sm:text-2xl text-DarkOrange" />
                  )}
                </div>
                <div className="border border-black border-solid rounded-t-xl lg:hidden">
                  <Image
                    src={url}
                    alt="logo banner"
                    loading="lazy"
                    width={1280}
                    height={720}
                    className="object-cover w-full h-auto rounded-t-xl"
                  />
                </div>

                <p className="text-lg break-words sm:text-base">
                  {description}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-lg md:text-base">
                  <span className="font-semibold">Categories : </span>
                  <span className="break-words">{`${tag?.join(", ")}`}</span>
                </p>
                <p className="text-lg md:text-base">
                  <span className="font-semibold">Pricing Model : </span>
                  <span className="break-words">{`${Pricing} `}</span>
                </p>
              </div>
              <div className="flex items-stretch justify-between pt-4 text-white md:justify-start md:space-x-10">
                <div>
                  <button title="Bookmark" type="button" onClick={handleBookmark} className="px-10 py-2 border rounded-lg outline-none border-DarkOrange text-DarkOrange hover:cursor-pointer">
                    {isBookMarked ? (
                      <BsBookmarkFill className="text-3xl text-DarkOrange" />
                    ) : (
                        <BsBookmark className="text-3xl text-DarkOrange " />
                    )}
                  </button>
                </div>
                <div>
                  <Link
                    href={link}
                    target="_blank"
                    className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-sm font-semibold border rounded-md outline-none sm:w-auto hover:bg-white hover:text-DarkOrange border-DarkOrange bg-DarkOrange lg:text-base"
                  >
                    <span>Visit Website</span>
                    <FiArrowUpRight className="text-xl" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden border border-black border-solid lg:block lg:col-span-6 rounded-t-xl">
              <Image
                src={url}
                alt="logo banner"
                loading="lazy"
                width={1280}
                height={720}
                className="object-cover w-full h-auto rounded-t-xl"
              />
            </div>
          </div>
        </div>

        {isOpen && <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      </main>
      <div className="px-8 mx-auto overflow-x-hidden max-w-7xl ">
        {detailedMsg && <Details content={detailedMsg} />}
      </div>
    </>
  );
}
