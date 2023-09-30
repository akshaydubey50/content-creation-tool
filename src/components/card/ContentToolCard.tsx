"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { useVerifiedToolContextData } from "@/lib/verifiedToolContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import LikedBookmarkModal from "../modal/LikedBookmarkModal";
import VisitWebsite from "../visit-website/VisitWebsite";

type Product = {
    id: string;
    url: string;
    title: string;
    description: string;
    tag: string;
    link: string;
    isVerified: boolean
  };

export function ContentToolCard({
    id,
    url,
    title,
    description,
    tag,
    link,
    isVerified = false
  }: Product) {
    // console.log('url>>>',url)
    const formattedTitle = title.toLowerCase().replace(/\s/g, "-");
    const [isBookMarked, setIsBookMarked] = useState(false);
    const { isVerifiedFilled } = useVerifiedToolContextData();
    const [likedTool, setLikedTool] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
  
    const formattedTag = tag[0].toLowerCase().replace(/\s/g, "-");
    const handleBookMark = () => {
      setIsOpen(true);
      setIsBookMarked(!isBookMarked);
      // console.log(' @@ bookmark', isBookMarked)
    }
  
    const handleLikedTool = () => {
      setIsOpen(true);
      setLikedTool(!likedTool);
      // console.log(' @@ likedTool', likedTool)
    }
  
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
            <section className="  border-b border-black border-solid">
              <Image
                src={url}
                alt="logo banner"
                loading="lazy"
                width="1280"
                height="720"
                decoding="async"
                data-nimg="1"
                className="rounded-t-2xl w-full object-cover"
              //   style="color: transparent"
              />
            </section>
          </Link>
          <section className="bg-light-gray pt-7 px-5 rounded-b-2xl h-full">
            <div className="flex flex-col justify-between h-full">
              <div className="">
                <div className="pb-4 flex flex-1 flex-row justify-between">
                  <div className="flex items-center gap-x-2">
                    <h1 className="font-bold text-Title-Medium md:text-Title-Large">
                      {title}
                    </h1>
  
                    {isVerified && <MdVerified className="text-2xl text-DarkOrange" />}
                  </div>
                  <button title="Bookmark" type="button" onClick={handleLikedTool} className="flex items-center gap-x-1">
                    <p>
                      {likedTool ? (<AiFillHeart className="text-3xl text-DarkOrange" />
                      ) : (<AiOutlineHeart className="text-3xl   text-black" />)}
                    </p>
                    <p className="">1</p>
                  </button>
                  {isOpen && <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />}
                </div>
                <div className="text-Description">
                  <p>{description}</p>
                </div>
              </div>
              <div className="tool-btn-section pb-7">
                <p className="my-6 ">
                  <Link className=" bg-white rounded-full  text-tags font-medium border 
                border-solid border-black px-5 py-1"
                    href={`/category/${formattedTag}`}
                    prefetch={true}
                  >
                    {tag}
                  </Link>
                </p>
                <div
                  className="text-white text-Title-Medium  flex 
          justify-between items-center"
                >
                  <VisitWebsite url={link} />
                  <button title="Bookmark" type="button" onClick={handleBookMark}>
                    {isBookMarked ? (<BsBookmarkFill className="text-3xl text-DarkOrange" />
                    ) : (<BsBookmark className="text-3xl   text-black" />)}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
