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
import AirtableModel from "@/models/airtable.model";
import {deleteBookmark,addBookmark} from "@/redux/slice/bookmark/bookmarkSlice";
import { addUpvote,deleteUpvote } from "@/redux/slice/upvote/upvoteSlice";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { isProductBookmarked, isProductUpvoted } from "@/helper/helper";
import { useSession } from "next-auth/react";
import { P } from "@upstash/redis/zmscore-5d82e632";

export function ProductCard(props: any) {
  const dispatch: AppDispatch = useDispatch();
  const { upVotedList,bookmarkList, product } = props;

  const { id, fields } = product;
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(() =>isProductBookmarked(id, bookmarkList))
  const [isUpvoted, setIsUpvoted] = useState(() => isProductUpvoted(id, upVotedList)  );
  const [count,setCount]=useState(0)
  const { data: session } = useSession();

  const { Tags, Name, WebsiteLink, Description, ToolImage, Verified,Pricing } = fields!;
  const formattedTitle = Name?.toLowerCase().replace(/\s/g, "-");
  const formattedTag = Tags[0].toLowerCase().replace(/\s/g, "-");

  const handleBookmarkClick = () => {
    if (!session?.user) {
      setIsOpen(true);
    } else {
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
  };

  const handleLikes = async () => {
    if (!session?.user) {
      return setIsOpen(true);
    } else {
      if (isUpvoted && id) {
        // @ts-ignore
        dispatch(deleteUpvote(id));
        setIsUpvoted(!isUpvoted);
      } else {
        // @ts-ignore
        dispatch(addUpvote(id));
        setIsUpvoted(!isUpvoted);
      }
    }
  };



  useEffect(() => {
    setIsBookMarked(isProductBookmarked(id, bookmarkList));
    console.log("bookmarkList", bookmarkList)
  }, [setIsBookMarked, isBookMarked, id, bookmarkList]);


  useEffect(() => {
    setIsLiked(isProductUpvoted(id, upVotedList));
    console.log("upVotedList", upVotedList)
  }, [setIsLiked, isUpvoted, id, upVotedList]);


  useEffect(()=>{
    if (upVotedList && id){

      const getCurrentUpvote=  isProductUpvoted(id, upVotedList)
      console.log('getCurrentUpvote', getCurrentUpvote)
      setCount(getCurrentUpvote?.count||0)
    }
  }, [upVotedList,id])
  return (
    <>
      <div
        className="rounded-2xl max-w-sm  flex flex-col  border border-black 
          border-solid  shadow-lg"
      >
        <Link
          href={{
            pathname: `/tool/${formattedTitle}`,
            query: {
              id: id,
            },
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
            <div className="">
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
                  onClick={handleLikes}
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
                {!session?.user && isOpen && (
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
                {/* <Link
                  className="bg-white rounded-full  text-tags font-medium border 
                border-solid border-black px-5 py-1"
                  href={`/category/${formattedTag}`}
                  prefetch={true}
                >
                </Link> */}
              </p>
              <div
                className="text-white text-Title-Medium  flex 
          justify-between items-center"
              >
                <VisitWebsite url={WebsiteLink} />
                <button
                  title="Bookmark"
                  type="button"
                  onClick={handleBookmarkClick}
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
