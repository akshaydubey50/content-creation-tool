"use client";
import React, { useState } from "react";
import { AirtableModel } from "@/models/airtable.model";
import { RiStackFill, RiSearchLine } from "react-icons/ri";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { VscVerifiedFilled, VscVerified } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBookmarkList,
  getBookmarkList,
} from "@/redux/slice/bookmark/bookmark.slice";
import { fetchProductList } from "@/redux/slice/product/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  clearProductVerifiedList,
  setIsVerifiedChecked,
  setProductVerifiedList,
} from "@/redux/slice/verified/verified.slice";
import { setIsBookmarkCheck } from "@/redux/slice/bookmark/bookmark.slice";
import LikedBookmarkModal from "../modal/LikedBookmarkModal";
import {
  setSearchInputFocus,
  scrollPage,
} from "@/redux/slice/search/searchSlice";
import { useSession } from "next-auth/react";

export default function HeroSection() {
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  const isBookmark = useSelector<any>(
    (store: RootState) => store.bookmarks.isBookmarkChecked
  );
  const isVerifiedCheck = useSelector(
    (store: RootState) => store.verifiedProducts.isVerifiedChecked
  );
  const verifiedProductData = useSelector(
    (store: RootState) => store.verifiedProducts.verifiedProductList
  );

  const { productList } = useSelector((state: RootState) => state.products);

  const handleShowAllProduct = () => {
    if (!productList) {
      dispatch(fetchProductList());
    }
    if (isVerifiedCheck) {
      dispatch(setIsVerifiedChecked());
      dispatch(clearProductVerifiedList());
    }
    if (isBookmark) {
      dispatch(setIsBookmarkCheck());
      dispatch(clearBookmarkList());
    }
  };

  const handleBookmark = async () => {
    if (!session) {
      return setIsOpen(true);
    } else {
      if (!isBookmark && session) {
        dispatch(setIsBookmarkCheck());
        dispatch(getBookmarkList());
      }
      if (isBookmark) {
        dispatch(setIsBookmarkCheck());
      }
      if (isVerifiedCheck) {
        dispatch(setIsVerifiedChecked());
      }
    }
  };

  const verifiedProductHandler = () => {
    const verifiedTool = productList?.filter(
      (item: AirtableModel) => item.fields.Verified
    );
    return verifiedTool;
  };

  const verifiedIconHandler = () => {
    if (isBookmark) {
      dispatch(setIsBookmarkCheck());
    }
    dispatch(setIsVerifiedChecked());
    if (verifiedProductData.length <= 0) {
      dispatch(setProductVerifiedList(verifiedProductHandler()));
    }
  };

  const searchIconHandler = () => {
    dispatch(scrollPage(600));
    dispatch(setSearchInputFocus());
  };
  return (
    <main className="py-12 xl:py-20 bg-light-gray h-2/4  xl:h-5/6  flex items-center justify-center"> 
      <section className="flex  flex-col place-items-center space-y-10  px-4 md:px-8 xl:px-10">
        <div className="">
          <div className="flex flex-col space-y-4 text-center">
            <p>
              <span className="rounded-full text-DarkOrange bg-white border-orange-500 font-semibold   border-solid border px-4 py-1">200+ Content Creation Tools</span>
            </p>
            <h1 className="font-semibold text-3xl leading-9 md:text-4xl mx-auto md:leading-45 md:max-w-2xl xl:text-8xl  xl:max-w-7xl xl:leading-tight">
              <span> Every tool you need to </span>
              <span>
            ace  at content creation.
              </span>
            </h1>
            <h5 className="text-base text-center  mx-auto xl:text-3xl  px-2 max-w-lg xl:max-w-6xl xl:leading-normal">
              {/* Directory of 200+ content creation tools designed to streamline
              your process and enhance productivity. */}
              Search, like, bookmark, and use the best content creation tools to streamline your workflow and create better content.
            </h5>
          </div>
        </div>
        <div>
          <div className="flex space-x-8 ">
            <div className="flex-1">
              <div className="flex space-x-2  md:space-x-4 lg:space-x-8 xl:space-x-12 ">
                <div className="flex flex-col place-items-center  space-y-4 cursor-pointer">
                  <button
                    className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6  "bg-gray-200" : "bg-gray-300"
                     hover:bg-opacity-75 focus:outline-none`}
                    onClick={handleShowAllProduct}
                  >
                    <RiStackFill className="text-2xl md:text-3xl lg:text-4xl text-black" />
                  </button>
                  <p className="font-medium text-Title-Small xl:text-Title-Medium">
                    All
                  </p>
                </div>
                <div className="flex flex-col place-items-center  space-y-4 cursor-pointer">
                  <button
                    className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6 
                        "bg-gray-200"  "bg-gray-300"
                    } hover:bg-opacity-75 focus:outline-none`}
                    onClick={handleBookmark}
                  >
                    {isBookmark ? (
                      <BsBookmarkFill className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    ) : (
                      <BsBookmark className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    )}
                  </button>
                  <p className="font-medium text-Title-Small xl:text-Title-Medium">
                    Bookmark
                  </p>
                  {!session && isOpen && (
                    <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />
                  )}
                </div>
                <div className="flex flex-col place-items-center  space-y-4 cursor-pointer">
                  <button
                    className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6 
                    "bg-gray-200" : "bg-gray-300"
                     hover:bg-opacity-75 focus:outline-none`}
                    onClick={verifiedIconHandler}
                  >
                    {isVerifiedCheck ? (
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
                    className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6  "bg-gray-200" : "bg-gray-300"
                    hover:bg-opacity-75 focus:outline-none`}
                    onClick={searchIconHandler}
                  >
                    {" "}
                    <RiSearchLine className="text-2xl md:text-3xl lg:text-4xl text-black" />
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
