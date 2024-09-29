"use client";
// React Component Import
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Backend Data Import

// Icon's Import
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// Project  Component Import
import LikedBookmarkModal from "../modal/LikedBookmarkModal";
import VisitWebsite from "../visit-website/VisitWebsite";
import {
  deleteBookmark,
  addBookmark,
} from "@/redux/slice/bookmark/bookmarkSlice";
import { addUpvote, deleteUpvote } from "@/redux/slice/upvote/upvoteSlice";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { isProductBookmarked } from "@/helper/helper";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { HomePage } from "@/constants/RoutePath";
import LikeButton from "../ui/likebutton";
import BookmarkButton from "../ui/bookmarkbutton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

export function ProductCard(props: any) {
  const { toast } = useToast();

  const DEBOUNCE_DELAY = 250; // ms

  const dispatch: AppDispatch = useDispatch();
  const { upVotedList, bookmarkList, product, totalLikes } = props;

  const { id, fields } = product;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBookMarked, setIsBookMarked] = useState<any>(() =>
    isProductBookmarked(id, bookmarkList)
  );
  const [count, setCount] = useState(totalLikes);
  const { data: session } = useSession();

  const { Name, WebsiteLink, Description, ToolImage, Verified, Pricing } =
    fields!;
  const formattedTitle = Name?.toLowerCase()?.trim()?.replace(/\s/g, "-");

  const dispatch = useDispatch<AppDispatch>();
  const likedList = useSelector((state: RootState) => state.likes.likedList);
  const bookmarkedList = useSelector(
    (state: RootState) => state.bookmarks.bookmarkList
  );

  const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);
  const [isAlreadyBookmarked, setIsAlreadyBookmarked] = useState(false);

  useEffect(() => {
    if (likedList.length > 0) {
      const toolLikedItem = likedList.find((item) => item.itemType === "tool");
      if (toolLikedItem?.itemIds != null) {
        // Check if the current id is in the itemIds array
        setIsAlreadyLiked(toolLikedItem.itemIds.includes(id));
      } else {
        setIsAlreadyLiked(false);
      }
    } else {
      setIsAlreadyLiked(false);
    }
  }, [id, likedList]);

  // New effect for bookmarks
  useEffect(() => {
    if (bookmarkedList.length > 0) {
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

  // const debouncedHandleLikes = useDebounce(handleLike, 250);
  // const debouncedHandleBookmark = useDebounce(handleBookmark, 250);

  return (
    <>
      <div
        className="rounded-2xl max-w-sm  flex flex-col  border border-black 
          border-solid  shadow-lg"
      >
        <Link
          href={{
            pathname: `${HomePage}/${formattedTitle}`,
          }}
        >
          <section className="border-b border-black border-solid">
            <Image
              src={ToolImage}
              alt={formattedTitle}
              loading="lazy"
              width="1280"
              height="720"
              decoding="async"
              data-nimg="1"
              className="rounded-t-2xl w-full object-cover"
            />
          </section>
        </Link>
        <section className="bg-light-gray pt-7 px-5 rounded-b-2xl h-full">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="pb-4 flex flex-1 flex-row justify-between">
                <div className="flex items-center gap-x-2">
                  <h2 className="font-bold text-Title-Medium md:text-Title-Large h-8">
                    {Name}
                  </h2>

                  {Verified && (
                    <MdVerified className="text-2xl text-DarkOrange" />
                  )}
                </div>
                <button
                  title="Likes"
                  type="button"
                  onClick={debouncedHandleLikes}
                  className="flex items-center gap-x-1"
                >
                  <p>
                    {isLiked ? (
                      <AiFillHeart className="text-3xl text-DarkOrange" />
                    ) : (
                      <AiOutlineHeart className="text-3xl   text-black" />
                    )}
                  </p>
                  <p className="">{count}</p>
                </button>
                {(!session || !session?.user) && isOpen && (
                  <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="text-Description h-16">
              <p className="line-clamp-3">{Description}</p>
            </div>
          </div>
          <div className="tool-btn-section pb-7">
            <p className="my-6">
              <span className="bg-white rounded-full text-tags font-medium border border-solid border-black px-5 py-1">
                {Pricing}
              </span>
            </p>
            <div className="text-white text-Title-Medium flex justify-between items-center">
              <VisitWebsite url={WebsiteLink} />
              {/* <button title="Bookmark" type="button" onClick={handleBookmark}>
                {isBookMarked ? (
                  <BsBookmarkFill className="text-3xl text-DarkOrange" />
                ) : (
                  <BsBookmark className="text-3xl text-black" />
                )}
              </button> */}
              <BookmarkButton
                id={id}
                Name={Name}
                isInitialBookmarked={isAlreadyBookmarked}
                itemType="tool"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
