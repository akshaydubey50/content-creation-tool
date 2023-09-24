"use client";
import React, { useEffect, useState } from "react";
import { RiStackFill, RiSearchLine, RiSearchFill } from "react-icons/ri";
import { PiStack } from "react-icons/pi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { VscVerified, VscVerifiedFilled } from "react-icons/vsc";
import { useVerifiedToolContextData } from "@/lib/verifiedToolContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function HeroSection() {
  const [isAllFilled, setIsAllFilled] = useState(false);
  const [isBookMarkFilled, setIsBookMarkFilled] = useState(false);
  const [isSearchFilled, setIsSearchFilled] = useState(false);
  const supabase = createClientComponentClient();
  const { isVerifiedFilled, handleVerifiedClick } =
    useVerifiedToolContextData();
  const handleAllClick = () => {
    setIsAllFilled(!isAllFilled);
  };
  const handleBookMarkClick = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      const { data, error } = await supabase
        .from("bookmark")
        .select("product_id")
        .eq("user_id", session.user?.id);

      if (!data) <>No Tool bookmarked Yet</>;
      console.log("user bookmarked data:", data);
    }
    setIsBookMarkFilled(!isBookMarkFilled);
  };

  
  const handleSearchClick = () => {
    setIsSearchFilled(!isSearchFilled);
  };
  return (
    <main className="py-12 xl:py-20 bg-light-gray  ">
      <section className="flex  flex-col place-items-center space-y-10 xl:space-y-14  px-4 md:px-8 xl:px-10">
        <div className="flex-1">
          <div className="flex flex-col space-y-4 text-center">
            <h1 className="font-bold text-2xl leading-9 md:text-4xl md:leading-45 xl:text-6xl xl:leading-90 ">
              Discover{" "}
              <span className="text-DarkOrange">
                200+ Content Creation Tools
              </span>
              <br />
              to Fuel Your Creativity.
            </h1>
            <h5 className="text-base  xl:text-3xl xl:leading-45">
              Search our massive database of the best and highest-
              <br />
              paying affiliate programs.
            </h5>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex space-x-8 ">
            <div className="flex-1">
              <div className="flex space-x-2  md:space-x-4 lg:space-x-8 xl:space-x-12 ">
                <div className="flex flex-col place-items-center  space-y-4 cursor-pointer">
                  <button
                    className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6 ${
                      isAllFilled ? "bg-gray-200" : "bg-gray-300"
                    } hover:bg-opacity-75 focus:outline-none`}
                    onClick={handleAllClick}
                  >
                    {isAllFilled ? (
                      <RiStackFill className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    ) : (
                      <PiStack className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    )}
                  </button>
                  <p className="font-medium text-Title-Small xl:text-Title-Medium">
                    All
                  </p>
                </div>
                <div className="flex flex-col place-items-center  space-y-4 cursor-pointer">
                  <button
                    className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6 ${
                      isBookMarkFilled ? "bg-gray-200" : "bg-gray-300"
                    } hover:bg-opacity-75 focus:outline-none`}
                    onClick={handleBookMarkClick}
                  >
                    {isBookMarkFilled ? (
                      <BsBookmarkFill className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    ) : (
                      <BsBookmark className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    )}
                  </button>
                  <p className="font-medium text-Title-Small xl:text-Title-Medium">
                    Bookmark
                  </p>
                </div>
                <div className="flex flex-col place-items-center  space-y-4 cursor-pointer">
                  <button
                    className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6 ${
                      isVerifiedFilled ? "bg-gray-200" : "bg-gray-300"
                    } hover:bg-opacity-75 focus:outline-none`}
                    onClick={handleVerifiedClick}
                  >
                    {isVerifiedFilled ? (
                      <VscVerifiedFilled className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    ) : (
                      <VscVerified className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    )}
                  </button>
                  <p className="font-medium text-Title-Small xl:text-Title-Medium">
                    Verified
                  </p>
                </div>
                <div className="flex flex-col place-items-center  space-y-4 cursor-pointer">
                  <button
                    className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6 ${
                      isSearchFilled ? "bg-gray-200" : "bg-gray-300"
                    } hover:bg-opacity-75 focus:outline-none`}
                    onClick={handleSearchClick}
                  >
                    {isSearchFilled ? (
                      <RiSearchLine className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    ) : (
                      <RiSearchLine className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    )}
                  </button>
                  <p className="font-medium text-Title-Small xl:text-Title-Medium">
                    Search
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
