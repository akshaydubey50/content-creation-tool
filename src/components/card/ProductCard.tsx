"use client";
// React Component Import
import React, { useCallback, useEffect, useState } from "react";
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
import { deleteBookmark, addBookmark } from "@/redux/slice/bookmark/bookmarkSlice";
import { addUpvote, deleteUpvote } from "@/redux/slice/upvote/upvoteSlice";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { isProductBookmarked } from "@/helper/helper";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

export function ProductCard(props: any) {
    const { toast } = useToast()

  const DEBOUNCE_DELAY = 250; // ms

  const dispatch: AppDispatch = useDispatch();
  const { upVotedList, bookmarkList, product, totalLikes } = props;

  const { id, fields } = product;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBookMarked, setIsBookMarked] = useState<any>(() => isProductBookmarked(id, bookmarkList))
  const [count, setCount] = useState(totalLikes)
  const { data: session } = useSession();

  const {  Name, WebsiteLink, Description, ToolImage, Verified, Pricing } = fields!;
  const formattedTitle = Name?.toLowerCase()?.trim()?.replace(/\s/g, "-");
  // const formattedTag = Tags[0].toLowerCase().replace(/\s/g, "-");

  console.log("formattedTitle", formattedTitle)
  const getCurrentProductUpvotedObj = (toolId: any) => {
    return upVotedList?.find((item: any) => item?.productId === toolId) || null;
  }


  const handleBookmark = useCallback(() => {
    if (!session || !session?.user) {
      setIsOpen(true);
      return;
    }
    setIsBookMarked(!isBookMarked);
    if (isBookMarked){
      toast({
        title: "You deleted the product",
        duration: 2000,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
        variant: "destructive"
      })
      // @ts-ignore
      dispatch(deleteBookmark(id));
    }
    else{
      toast({
        title: "You saved the product",
        duration: 2000,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
        variant: "success"
      })
      // @ts-ignore
      dispatch(addBookmark(id));
    }
      

    
  }, [session, isBookMarked, id, dispatch]);


  const handleLikes = useCallback(() => {
    if (!session?.user) {
      setIsOpen(true);
      return;
    }

    if (isLiked) {
      setIsLiked(false);
      setCount((prevCount:any) => prevCount - 1);
      toast({
        title: "You downvoted the product",
        duration: 2000,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
        variant: "destructive"
      });
      // @ts-ignore
      dispatch(deleteUpvote(id));
    } else {
      setIsLiked(true);
      setCount((prevCount:any) => prevCount + 1);
      toast({
        title: "You upvoted the product",
        duration: 2000,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
        variant: "success"
      });
      // @ts-ignore
      dispatch(addUpvote(id));
    }
  }, [session, isLiked, id, dispatch, setIsOpen]);

  function debounce(func: Function, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedHandleLikes = useCallback(
    debounce(handleLikes, DEBOUNCE_DELAY),
    [handleLikes]
  );


  const debouncedHandleBookmark = useCallback(
    debounce(handleBookmark, DEBOUNCE_DELAY),
    [handleBookmark]
  );

  
  useEffect(() => {
    setIsBookMarked(isProductBookmarked(id, bookmarkList));
  }, [id, bookmarkList]);



  useEffect(() => {
    const upvotedObj = getCurrentProductUpvotedObj(id);
    setIsLiked(upvotedObj?.isProductLikedByUser || false);
  }, [id]);  


  
  return (
    <>
      <div
        className="rounded-2xl max-w-sm  flex flex-col  border border-black 
          border-solid  shadow-lg"
      >
        <Link
          href={{
            pathname: `/tool/${formattedTitle}`
          }}
        >
          <section className="border-b border-black border-solid">
            <Image
              src={ToolImage}
              alt="logo banner"
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
                  <h1 className="font-bold text-Title-Medium md:text-Title-Large h-8">
                    {Name}
                  </h1>

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
            <div className="">
              <div className="text-Description h-16 ">
                <p className="line-clamp-3">{Description}</p>
              </div>
            </div>
            <div className="tool-btn-section pb-7">
              <p className="my-6  ">
                <span className="bg-white rounded-full  text-tags font-medium border 
                border-solid border-black px-5 py-1">
                  {Pricing}
                </span>
             
              </p>
              <div
                className="text-white text-Title-Medium  flex 
          justify-between items-center"
              >
                <VisitWebsite url={WebsiteLink} />
                <button
                  title="Bookmark"
                  type="button"
                  onClick={debouncedHandleBookmark  }
                >
                  {isBookMarked ? (
                    <BsBookmarkFill className="text-3xl text-DarkOrange" />
                  ) : (
                    <BsBookmark className="text-3xl   text-black" />
                  )}
                </button>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
