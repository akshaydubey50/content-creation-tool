"use client";
// React Component Import
import React, { useState } from "react";
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
import { Product } from "@/types/product";

// type Product = {
//   id: string;
//   url: string;
//   title: string;
//   description: string;
//   tag: string;
//   link: string;
//   isVerified: boolean;
// };

export function ProductCard(props: any) {
  const supabase = createClientComponentClient();

  const [userSession, setUserSession] = useState<Session>();
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [likedTool, setLikedTool] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { product } = props;
  const { id, fields } = product;
  /*
  console.log("prod product.product.fields", product);
  console.log("fields", fields);
  */ 

  const {
    Tags,
    Price,
    Status,
    Name,
    WebsiteLink,
    Description,
    ToolImage,
    Verified,
  } = fields;
  const formattedTitle = Name.toLowerCase().replace(/\s/g, "-");
  const formattedTag = Tags[0].toLowerCase().replace(/\s/g, "-");

  const addBookmark = async () => {
    if (isBookMarked) {
      setIsBookMarked(false);
      console.log("deleting to bookmark");
      const res = await fetch("/api/bookmarks/" + id, {
        method: "DELETE",
      });
      if (res.status !== 200) {
        setIsBookMarked(true);
      }
      setIsBookMarked(false);
      console.log("deleting to bookmark");
    } else {
      setIsBookMarked(true);
      console.log("adding to bookmark");
      const res = await fetch("/api/bookmarks/" + id, {
        method: "POST",
      });
      if (res.status !== 200) {
        setIsBookMarked(false);
      }
      setIsBookMarked(true);
      console.log("added to bookmark");
    }
  };

  const addLikes = async () => {
    if (isBookMarked) {
      setIsBookMarked(false);
      console.log("deleting to likes");
      const res = await fetch("/api/likes/" + id, {
        method: "DELETE",
      });
      if (res.status !== 200) {
        setIsBookMarked(true);
      }
      setIsBookMarked(false);
      console.log("deleted to likes");
    } else {
      setIsBookMarked(true);
      console.log("adding to likes");
      const res = await fetch("/api/likes/" + id, {
        method: "POST",
      });
      if (res.status !== 200) {
        setIsBookMarked(false);
      }
      setIsBookMarked(true);
      console.log("added to likes");
    }
  };

  const handleBookMark = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      const { data, error } = await supabase
        .from("bookmark")
        .select("id")
        .eq("user_id", session.user?.id)
        .eq("product_id", id);

      if (error) {
        console.error(error);
      } else {
        // product exist deleting
        if (data.length === 1) {
          const { error } = await supabase
            .from("bookmark")
            .delete()
            .eq("user_id", session.user?.id)
            .eq("product_id", id);
          setIsBookMarked(false);
        }
        if (data.length === 0) {
          const { data: bookmark, error: err } = await supabase
            .from("bookmark")
            .insert([{ user_id: session.user?.id, product_id: id }])
            .select();
          setIsBookMarked(true);
          console.log("bookmark added to db::", bookmark);
        }
      }
    } else {
      setIsOpen(true);
      console.log("sign in to bookmark the post");
    }
  };

  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session !== null) {
      setUserSession(session);
    }
  };

  const handleLikedTool = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      const { data, error } = await supabase
        .from("likes")
        .select("id")
        .eq("user_id", session.user?.id)
        .eq("product_id", id);

      if (error) {
        console.error(error);
      } else {
        // product exist deleting
        if (data.length === 1) {
          const { error } = await supabase
            .from("likes")
            .delete()
            .eq("user_id", session.user?.id)
            .eq("product_id", id);
          setLikedTool(false);
        }
        if (data.length === 0) {
          const { data: likes, error: err } = await supabase
            .from("likes")
            .insert([{ user_id: session.user?.id, product_id: id }])
            .select();
          setLikedTool(true);
          console.log("like added to db::", likes);
        }
      }
    } else {
      setIsOpen(true);
      console.log("sign in to like the post");
    }
  };

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

                  {/* {isVerified && (
                    <MdVerified className="text-2xl text-DarkOrange" />
                  )} */}
                </div>
                {/* <button
                  title="Bookmark"
                  type="button"
                  onClick={handleLikedTool}
                  className="flex items-center gap-x-1"
                >
                  <p>
                    {likedTool ? (
                      <AiFillHeart className="text-3xl text-DarkOrange" />
                    ) : (
                      <AiOutlineHeart className="text-3xl   text-black" />
                    )}
                  </p>
                  <p className="">1</p>
                </button>
                {isOpen && (
                  <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />
                )} */}
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
                  className=" bg-white rounded-full  text-tags font-medium border 
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
                <button title="Bookmark" type="button" onClick={addLikes}>
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
