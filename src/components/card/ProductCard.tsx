"use client";
// React Component Import
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Backend Data Import
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";

// Icon's Import
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// Project  Component Import
import LikedBookmarkModal from "../modal/LikedBookmarkModal";
import VisitWebsite from "../visit-website/VisitWebsite";
import AirtableModel from "@/models/airtableModel";
import { deleteBookmark, addBookmark } from "@/lib/slice/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { isProductBookmarked, isProductLikedByUser } from "@/helper/helper"
import useUpvoteCount from "@/hooks/useUpvoteCount";

export function ProductCard(props: any) {
  const { bookmarkList, isBookmark, product } = props;
  const { id, fields } = product;
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(() =>
    isProductBookmarked(id, bookmarkList)
  );
  const dispatch: AppDispatch = useDispatch();
  const { totalCount, updateUpVoteCount, productUpVoteCount } = useUpvoteCount(id);

  const userAuthData = useSelector(
    (store: RootState) => store.user.userSession
  );
  const { Tags, Name, WebsiteLink, Description, ToolImage, Verified } = fields!;
  const formattedTitle = Name.toLowerCase().replace(/\s/g, "-");
  const formattedTag = Tags[0].toLowerCase().replace(/\s/g, "-");

  const handleBookmarkClick = () => {
    if (!userAuthData) {
      setIsOpen(true)
    }
    else {
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

  const addLikes = async () => {
    if (!userAuthData) {
      return setIsOpen(true);
    } else {
      updateUpVoteCount(id)
      productCountHandler()
      setIsLiked(!isLiked)
    }
  };


  const productCountHandler = () => {
    const supabaseClient = createClientComponentClient();

    const channel = supabaseClient
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: "likes"
        },
        async (payload: any) => {
          await productUpVoteCount()
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe();
    };
  }

  const likedByUser = async (id:number) => {
    const booleanVal = await isProductLikedByUser(id)
    setIsLiked(booleanVal)
  }

  useEffect(() => {
    setIsBookMarked(isProductBookmarked(id, bookmarkList));
  }, [setIsBookMarked, isBookMarked, id, bookmarkList]);

  useEffect(() => {
    productCountHandler()
  }, [id])

  useEffect(()=>{
    likedByUser(id)
  },[id])

  return (
    <>
      <div
        className="rounded-2xl max-w-sm  flex flex-col  border border-black 
          border-solid  shadow-2xl"
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
                  <h1 className="font-bold text-Title-Medium md:text-Title-Large">
                    {Name}
                  </h1>

                  {Verified && (
                    <MdVerified className="text-2xl text-DarkOrange" />
                  )}
                </div>
                <button
                  title="Likes"
                  type="button"
                  onClick={addLikes}

                  className="flex items-center gap-x-1"
                >
                  <p>
                    {isLiked ? (
                      <AiFillHeart className="text-3xl text-DarkOrange" />
                    ) : (
                      <AiOutlineHeart className="text-3xl   text-black" />
                    )}
                  </p>
                  <p className="">{totalCount}</p>
                </button>
                {!userAuthData && isOpen && (
                  <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />
                )}
              </div>
            </div>
            <div className="">
              <div className="text-Description">
                <p>{Description}</p>
              </div>
            </div>
            <div className="tool-btn-section pb-7">
              <p className="my-6 ">
                <Link
                  className="bg-white rounded-full  text-tags font-medium border 
                border-solid border-black px-5 py-1"
                  href={`/category/${formattedTag}`}
                  prefetch={true}
                >
                  {Tags}
                </Link>
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
                {!userAuthData && isOpen && (
                  <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />
                )}
              </div>
            </div>
          </div>
        </section >
      </div >
    </>
  );


}
