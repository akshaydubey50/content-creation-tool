"use client";
import React, { useEffect, useRef, useState } from "react";
import { useApiDataContext } from "@/lib/productContext";
import AirtableModel from "@/models/airtableModel";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import { useRouter, useParams } from "next/navigation";
import { useVerifiedToolContextData } from "@/lib/verifiedToolContext";
import SelectDropdown from "./SelectDropdown";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryData } from "@/lib/categorySlice";
import { setSearchQuery, setSearchFilterData, clearSearchFilterData } from "@/lib/searchSlice"

type Product = {
  // url: string;
  title: string;
  description: string;
  tag: string;
  link: string;
};
export default function FilterSection() {

  const router = useRouter();

  /*Redux Dispatch & Selector*/
  const dispatch = useDispatch();
  const categoryData = useSelector((store) => store.category.categoryData);
  const searchQuery = useSelector((store) => store.searchProduct.searchQuery);
  const filterData = useSelector((store) => store.searchProduct.filterData);


  /*Context Data*/
  const { apiData } = useApiDataContext();
  const { setVisibleItem } = useVisibleItemContextData();
  const { setIsVerifiedFilled } = useVerifiedToolContextData();


  /*Search Functionality*/
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(""))
    dispatch(setCategoryData(""));

    const newSearch = event.target.value
    const lowercaseSearchQuery = newSearch && newSearch.toLowerCase();
    dispatch(setSearchQuery(lowercaseSearchQuery))

    /* Filter data based on the updated search query */
    const filteredResults = apiData.filter((searchData: AirtableModel) => {
      const tooldatalist = searchData.fields.Name.toLowerCase();
      return lowercaseSearchQuery && tooldatalist.includes(lowercaseSearchQuery);
    });

   
    if (newSearch === "") {
      // If search is empty, show default data
      dispatch(clearSearchFilterData()); 
    } else if (filteredResults.length > 0) {
      // If there are filtered results, update filtered data
      dispatch(setSearchFilterData(filteredResults));
    } else {
      // If no results found, show no result message
      dispatch(setSearchFilterData(null)); 
    }
    setVisibleItem(9);
  };

  /*Get a List for Category*/
  const getListOfCategory = (): Set<string> => {
    const categoryItem = new Set<string>([]);
    apiData.map((item: AirtableModel) => {
      if (item.fields.Tags[0] !== undefined) {
        categoryItem.add(item.fields.Tags[0]);
      }
    });
    return categoryItem;
  };

  /* Selected Category functionality */
  const selectedCategory = (selectedOption: any) => {
    if (selectedOption) {
      let categoryVal = selectedOption.value;
      let formatedCategory = categoryVal.toLowerCase().replace(/\s/g, "-");
      router.push(`/category/${formatedCategory}`);
      setIsVerifiedFilled(false);

      dispatch(clearSearchFilterData());
      dispatch(setCategoryData(categoryVal));

      setVisibleItem(9);
    }
  };

  /*Clear Filter*/
  const clearFilter = () => {
    router.push("/");
    dispatch(setSearchQuery(""));
    dispatch(clearSearchFilterData());
    dispatch(setCategoryData(""));
    setVisibleItem(9);
  };
  
  useEffect(() => { }, [
    setVisibleItem,
    searchQuery,
    categoryData,
    filterData,
  ]);



  const categoryOptionsList = Array.from(getListOfCategory()).map(
    (item: string, index: number) => {
      return {
        value: item,
        label: item,
      };
    }
  );

  return (
    <>
      <section className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 px-10 py-5 md:gap-4  mx-auto text-white  lg:max-w-5xl xl:max-w-6xl   text-Title-Small lg:text-Title-Small">
        <div className="col-span-1 ">
          <div className="">
            <button
              className="bg-DarkOrange  px-5 lg:px-8 py-3 rounded-full focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-semibold w-full text-center "
              onClick={clearFilter}
            >
              All
            </button>
          </div>
        </div>
        <div className="col-span-1 ">
          <div className=" bg-DarkOrange  rounded-full  h-full">
            <SelectDropdown
              key={categoryData}
              placeholder="Select Category"
              options={categoryOptionsList}
              onChange={selectedCategory}
              value={
                categoryOptionsList.find(
                  (option) => option.value === categoryData
                ) || null
              }
            />
          </div>
        </div>
        <div className="col-span-1 font-medium">
          <div className="">
            <button
              className="bg-DarkOrange whitespace-nowrap px-5  py-3 rounded-full focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-semibold w-full text-center"
              onClick={clearFilter}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="col-span-1 font-medium">
          <div className=" text-black py-0.5 ">
            <input
              onChange={handleSearch}
              className="rounded-full w-full  border-2 outline-none px-3 py-2 font-medium border-black border-solid"
              type="text"
              placeholder="Search By Tool Name"
            />
          </div>
        </div>
      </section>

      {/* Visible in mobile screen only */}
      <section className="grid grid-cols-1 md:hidden py-[25px]  gap-3 text-Title-Small lg:text-Title-Large max-w-md mx-auto px-[30px]">
        <div className="col-span-1">
          <input
            className="rounded-full w-full  border-2 outline-none p-3 font-medium border-black border-solid"
            type="text"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>
        <div className="col-span-1">
          <div className="bg-DarkOrange  rounded-full text-white  w-full ">
            <SelectDropdown
              key={categoryData}
              placeholder="Select Category"
              options={categoryOptionsList}
              onChange={selectedCategory}
              value={
                categoryOptionsList.find(
                  (option) => option.value === categoryData
                ) || null
              }
            />
          </div>
        </div>
        <div className="col-span-1 text-white font-semibold">
          <div className=" grid grid-cols-2 gap-x-4">
            <div className="col-span-1">
              <button
                className="w-full bg-DarkOrange   p-3 rounded-full focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 "
                onClick={clearFilter}
              >
                All
              </button>
            </div>
            <div className="col-span-1">
              <button
                className="w-full bg-DarkOrange whitespace-nowrap p-3 rounded-full  focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 "
                onClick={clearFilter}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
