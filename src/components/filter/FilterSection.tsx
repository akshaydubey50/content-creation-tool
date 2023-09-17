"use client";
import React, { useEffect, useState } from "react";
import { useApiDataContext } from "@/lib/productContext";
import CardContainer from "@/components/card/ProductCard";
import AirtableModel from "@/models/airtableModel";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";

type Product = {
  // url: string;
  title: string;
  description: string;
  tag: string;
  link: string;
};
export default function FilterSection({ setFilterData, setCategoryData }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const { apiData } = useApiDataContext();
  const { visibleItem, setVisibleItem } = useVisibleItemContextData();
  const handleSearch = (e: any) => {
    setCategoryValue("");
    setCategoryData("");
    const newSearch = e.target.value;
    setSearchQuery(newSearch);
    const lowercaseSearchQuery = newSearch.toLowerCase();

    // Filter data based on the updated search query
    const filteredResults = apiData.filter((searchData: any) => {
      const tooldatalist = searchData.fields.Name.toLowerCase();
      return tooldatalist.includes(lowercaseSearchQuery);
    });

    if (filteredResults.length > 0) {
      // Update filteredData state
      setFilterData(filteredResults);
    } else {
      setFilterData(null);
    }
  };

  const getListOfCategory = (): Set<string> => {
    const categoryItem = new Set<string>([]);
    apiData.map((item: AirtableModel) => {
      if (item.fields.Tags[0] !== undefined) {
        categoryItem.add(item.fields.Tags[0]);
      }
    });
    return categoryItem;
  };

  const selectedCategory = (e: any) => {
    let categoryVal = e.target.value;
    setFilterData("");
    setCategoryData(categoryVal);
    setCategoryValue(categoryVal);
  };
  const clearFilter = () => {
    setCategoryValue("");
    setCategoryData("");
    setSearchQuery("");
    setVisibleItem(9);
    setFilterData([]);
  };
  useEffect(() => {}, [
    setCategoryValue,
    setCategoryData,
    setSearchQuery,
    setVisibleItem,
    setFilterData,
  ]);
  return (
    <>
      <section className="hidden md:flex md:flex-col lg:flex-row py-6 justify-center items-center lg:space-x-4 px-10 lg:px-14 xl:px-0  md:space-y-3 lg:space-y-0 mx-auto lg:max-w-5xl xl:max-w-6xl   text-Title-Small lg:text-Title-Small">
        <p className="text-black font-medium">Filters</p>
        {/* Dropdown */}
        <div className="flex justify-between items-center space-x-5 w-full">
          <div className="md:w-1/3 lg:w-1/3 md:flex-1">
            <button
              className="bg-DarkOrange  px-5 lg:px-8 py-2.5 rounded-full focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-medium w-full text-center"
              onClick={clearFilter}
            >
              All
            </button>
          </div>
          <div className="md:flex-1 bg-DarkOrange  rounded-full px-5 font-medium  py-2 border-2 border-DarkOrange border-solid md:w-full lg:w-full ">
            <select
              title="select"
              name=""
              id=""
              className="bg-transparent  focus:outline-none text-black w-full text-center"
              onChange={selectedCategory}
              value={categoryValue}
            >
              <option defaultValue="Select Category">Category </option>
              {Array.from(getListOfCategory()).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="flex-1 bg-orange-200  rounded-full px-5 font-medium  py-2 border-2 border-DarkOrange border-solid md:w-full lg:w-full hidden">
            <select
              title="Price"
              name=""
              id=""
              className="bg-transparent  focus:outline-none text-black w-full "
            >
              <option defaultValue="Price">Price</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
            </select>
          </div> */}
        </div>
        <div className="md:flex lg:none space-x-5 justify-between  items-center w-full">
          <div className="md:w-1/3 flex-1">
            <button
              className="bg-DarkOrange whitespace-nowrap px-5  py-3 rounded-full focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-medium w-full text-center"
              onClick={clearFilter}
            >
              Clear Filters
            </button>
          </div>
          <div className="flex-1 text-black md:w-2/3  lg:w-full py-0.5 ">
            <input
              value={searchQuery}
              onChange={handleSearch}
              className="rounded-full w-full  border-2 outline-none px-3 py-2 font-medium border-black border-solid"
              type="text"
              placeholder="Search By Tool Name"
            />
          </div>
        </div>
      </section>

      {/* Visible in mobile screen only */}
      <section className="flex flex-col md:hidden py-[25px]  space-y-4 text-Title-Small lg:text-Title-Large max-w-md mx-auto px-[30px]">
        <p className="text-black font-medium    text-center">Filters</p>
        {/* Dropdown */}
        <div className="text-black lg:w-full ">
          <input
            className="rounded-full w-full  border-2 outline-none px-3 py-2 font-medium border-black border-solid"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex justify-center space-x-4">
          <div className="bg-orange-200  rounded-full px-3 font-medium  py-2 border-2 border-DarkOrange border-solid w-full lg:w-1/3">
            <select
              title="Category"
              name=""
              id=""
              className="bg-transparent  focus:outline-none text-black w-full text-center"
              onChange={selectedCategory}
              value={categoryValue}
            >
              <option defaultValue="Category">Category </option>
              {Array.from(getListOfCategory()).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-orange-200  rounded-full px-3 font-medium  py-2 border-2 border-DarkOrange border-solid lg:w-1/3 w-full hidden">
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
            <button
              className="bg-DarkOrange  px-5 lg:px-8 py-2 rounded-full focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-medium w-full"
              onClick={clearFilter}
            >
              All
            </button>
          </div>
          <div className="lg:w-1/3 w-full">
            <button
              className="bg-DarkOrange whitespace-nowrap px-2 lg:px-3  py-2 rounded-full focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-medium w-full"
              onClick={clearFilter}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
