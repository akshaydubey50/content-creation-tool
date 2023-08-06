"use client";
import React, { useState } from "react";

export default function FilterSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
  };

  return (
    <>
      <section className="hidden md:flex md:flex-col lg:flex-row py-6 justify-center items-center px-10 lg:px-14 xl:px-0 lg:space-x-10  md:space-y-3 lg:space-y-0 mx-auto max-w-6xl   text-Title-Small lg:text-Title-Large">
        <p className="text-black font-medium  ">Filters</p>
        {/* Dropdown */}
        <div className="flex justify-between items-center space-x-5 w-full">
          <div className="md:w-1/3 lg:w-1/3 ">
            <button className="bg-DarkOrange  px-5 lg:px-8 py-2 rounded-full focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-medium w-full">
              All
            </button>
          </div>
          <div className="bg-orange-200  rounded-full px-1 font-medium  py-2 border-2 border-DarkOrange border-solid md:w-full lg:w-full ">
            <select
              title="select"
              name=""
              id=""
              className="bg-transparent  focus:outline-none text-black w-full "
            >
              <option defaultValue="Category">Category </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="bg-orange-200  rounded-full px-3 font-medium  py-2 border-2 border-DarkOrange border-solid md:w-full lg:w-full ">
            <select
              title="Price"
              name=""
              id=""
              className="bg-transparent  focus:outline-none text-black w-full"
            >
              <option defaultValue="Price">Price</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
            </select>
          </div>
        </div>
        <div className="md:flex lg:none space-x-5 justify-between  items-center w-full">
          <div className="md:w-1/3">
            <button className="bg-DarkOrange whitespace-nowrap px-2  py-2 rounded-full focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-medium w-full">
              Clear Filters
            </button>
          </div>
          <div className="text-black md:w-2/3  lg:w-full py-0.5 ">
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="rounded-full w-full  border-2 outline-none px-3 py-2 font-medium border-black border-solid"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </section>

      {/* Visible in mobile screen only */}
      <section className="flex flex-col md:hidden py-[25px]  space-y-4 text-Title-Small lg:text-Title-Large  px-[30px]">
        <p className="text-black font-medium    text-center">Filters</p>
        {/* Dropdown */}
        <div className="text-black lg:w-full ">
          <input
            className="rounded-full w-full  border-2 outline-none px-3 py-1 font-medium border-black border-solid"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="flex justify-center space-x-4">
          <div className="bg-orange-200  rounded-full px-3 font-medium  py-2 border-2 border-DarkOrange border-solid w-full lg:w-1/3">
            <select
              title="Category"
              name=""
              id=""
              className="bg-transparent  focus:outline-none text-black w-full "
            >
              <option defaultValue="Category">Category </option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
            </select>
          </div>
          <div className="bg-orange-200  rounded-full px-3 font-medium  py-2 border-2 border-DarkOrange border-solid lg:w-1/3 w-full">
            <select
              title="Price"
              name=""
              id=""
              className="bg-transparent  focus:outline-none text-black w-full"
            >
              <option defaultValue="Price">Price</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="lg:w-1/3  w-full">
            <button className="bg-DarkOrange  px-5 lg:px-8 py-2 rounded-full focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-medium w-full">
              All
            </button>
          </div>
          <div className="lg:w-1/3 w-full">
            <button className="bg-DarkOrange whitespace-nowrap px-2 lg:px-3  py-2 rounded-full focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-medium w-full">
              Clear Filters
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
