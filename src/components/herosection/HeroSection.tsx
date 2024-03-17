"use client";
import React, { useState } from "react";
import AirtableModel from "@/models/airtableModel";
import { RiStackFill, RiSearchLine } from "react-icons/ri";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { VscVerifiedFilled, VscVerified } from "react-icons/vsc";
import { GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { clearBookmarkList, getBookmarkList } from "@/lib/slice/bookmarkSlice";
import { fetchProductList } from "@/lib/slice/productSlice";
import { AppDispatch, RootState } from "@/lib/store";
import {
  clearProductVerifiedList,
  setIsVerifiedChecked,
  setProductVerifiedList,
} from "@/lib/slice/verifiedSlice";
import { setIsBookmarkCheck } from "@/lib/slice/bookmarkSlice";
import LikedBookmarkModal from "../modal/LikedBookmarkModal";
import { setSearchInputFocus, scrollPage } from "@/lib/slice/searchSlice";

export default function HeroSection() {
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const isUserLoggedIn = useSelector(
    (store: RootState) => store.user.isUserAuthenticated
  );
  const userAuthData = useSelector(
    (store: RootState) => store.user.userSession
  );
  const { isUserAuthenticated, error, userSession } = useSelector(
    (store: RootState) => store.user
  );
  const isBookmark = useSelector<any>(
    (store: RootState) => store.bookmark.isBookmarkChecked
  );
  const isVerifiedCheck = useSelector(
    (store: RootState) => store.verifiedProduct.isVerifiedChecked
  );
  const verifiedProductData = useSelector(
    (store: RootState) => store.verifiedProduct.verifiedProductList
  );

  const { productList } = useSelector((state: RootState) => state.product);

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
    if (!userAuthData) {
      return setIsOpen(true);
    } else {
      if (!isBookmark && isUserAuthenticated) {
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

  const searchIconHandler =()=>{
    dispatch(setSearchInputFocus())
    dispatch(scrollPage(700))
  }
  return (
    <>
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
                      className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6  "bg-gray-200" : "bg-gray-300"
                     hover:bg-opacity-75 focus:outline-none`}
                      onClick={handleShowAllProduct}
                    >
                      <RiStackFill className="text-2xl md:text-3xl lg:text-4xl text-black" />
                      {/* {isAllFilled ? (
                      <RiStackFill className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    ) : (
                      <PiStack className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    )} */}
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
                      {/* <BsBookmarkFill className="text-2xl md:text-3xl lg:text-4xl text-black" /> */}
                      {isBookmark ? (
                        <BsBookmarkFill className="text-2xl md:text-3xl lg:text-4xl text-black" />
                      ) : (
                        <BsBookmark className="text-2xl md:text-3xl lg:text-4xl text-black" />
                      )}
                    </button>
                    <p className="font-medium text-Title-Small xl:text-Title-Medium">
                      Bookmark
                    </p>
                    {!userAuthData && isOpen && (
                      <LikedBookmarkModal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                      />
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

                  {/*
                <div className="flex flex-col place-items-center  space-y-4 cursor-pointer">
                  <button
                    className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6 
                     "bg-gray-200" : "bg-gray-300"
                     hover:bg-opacity-75 focus:outline-none`}
                    onClick={() => {
                      console.log("Liked btn clicked");
                    }}
                  >
                    <GoHeartFill className="text-2xl md:text-3xl lg:text-4xl text-black" />
                      {islikeFilled ? (
                      <GoHeartFill className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    ) : (
                      <GoHeart className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    )} 
                  </button>
                  <p className="font-medium text-Title-Small xl:text-Title-Medium">
                    Liked
                  </p>
                </div>
                    */}

                  <div className="flex flex-col place-items-center  space-y-4 cursor-pointer">
                    <button
                      className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6  "bg-gray-200" : "bg-gray-300"
                    hover:bg-opacity-75 focus:outline-none`}
                      onClick={searchIconHandler}
                    >
                      {" "}
                      <RiSearchLine className="text-2xl md:text-3xl lg:text-4xl text-black" />
                      {/*  {isSearchFilled ? (
                      <RiSearchLine className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    ) : (
                      <RiSearchLine className="text-2xl md:text-3xl lg:text-4xl text-black" />
                    )} */}
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
    </>
  );
}
