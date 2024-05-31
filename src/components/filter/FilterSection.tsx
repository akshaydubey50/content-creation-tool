"use client";
import AirtableModel from "@/models/airtableModel";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import SelectDropdown from "./SelectDropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryData,
  clearCategoryData,
  clearMatchedCategory,
} from "@/lib/slice/categorySlice";
import {
  setSearchQuery,
  setSearchFilterList,
  clearSearchFilterList,
} from "@/lib/slice/searchSlice";
import { RootState, AppDispatch } from "@/lib/store";
import {  scrollPage } from "@/lib/slice/searchSlice";

export default function FilterSection() {
  const [isMounted, SetIsMounted] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  /*Redux Dispatch & Selector*/
  const dispatch = useDispatch();
  const categoryData = useSelector((store: RootState) => store.category.categoryData);
  const searchQuery = useSelector((store: RootState) => store.search.searchQuery);
  const filterData = useSelector((store: RootState) => store.search.searchFilterList);
  const { productList } = useSelector((state: RootState) => state.product);
  const searchToFocusInput = useSelector((state: RootState) => state.search.searchToFocus)
  const scrollPosition = useSelector((state: RootState) => state.search.scrollPosition);

  /*Context Data*/
  const { setVisibleItem } = useVisibleItemContextData();

  /*Search Functionality*/
  const handleSearch = () => {
    const newSearch = searchRef.current!.value.toLowerCase();
    dispatch(setSearchQuery(newSearch));

    /* Filter data based on the updated search query */
    const filteredResults = productList &&productList?.filter((searchData: AirtableModel) => {
        const tooldatalist = searchData.fields.Name.toLowerCase();
        if (newSearch) {
          return tooldatalist.includes(newSearch);
        }
      });

    if (newSearch === "") {
      // If search is empty, show default data
      dispatch(clearSearchFilterList());
    } else if (filteredResults.length > 0) {
      // If there are filtered results, update filtered data
      dispatch(setSearchFilterList(filteredResults));
    } else {
      // If no results found, show no result message
      dispatch(setSearchFilterList([]));
    }

    setVisibleItem(9);
  };

  /* Selected Category functionality */
  const selectedCategory = (selectedOption: any) => {
    if (selectedOption) {
      let categoryVal = selectedOption.value;
      let formatedCategory = categoryVal.toLowerCase().replace(/\s/g, "-");
      router.push(`/category/${formatedCategory}`);
      dispatch(clearSearchFilterList());
      dispatch(setCategoryData(categoryVal));
      setVisibleItem(9);
    }
  };

  /*Clear Filter*/
  const clearFilter = () => {
    router.push("/");
    if (searchQuery.length > 0) {
      dispatch(setSearchQuery(""));
      dispatch(clearSearchFilterList());
    } else if (categoryData.length > 0) {
      dispatch(clearCategoryData());
      dispatch(clearMatchedCategory([]));
    }
    if (searchRef.current!.value){
      searchRef.current!.value = ''; 
      searchRef.current!.innerText = ''; 
    }

    setVisibleItem(9);
  };

  /*Get a List for Category*/
  const getListOfCategory = (): Set<string> => {
    const categoryItem = new Set<string>([]);
    productList?.length > 0 &&
      productList?.map((item: AirtableModel) => {
        if (item?.fields?.Tags !== undefined ) {
          categoryItem.add(item?.fields?.Tags[0]);
        }
      });
    return categoryItem;
  };

  const categoryOptionsList = Array.from(getListOfCategory()).map(
    (item: string, index: number) => {
      return {
        value: item,
        label: item,
      };
    }
  );

  useEffect(() => {}, [setVisibleItem, searchQuery, categoryData, filterData]);

  useEffect(() => {
    SetIsMounted(true);
  }, []);

  useEffect(()=>{
    if (searchToFocusInput){
      searchRef.current?.focus()
    }
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  }, [searchToFocusInput, scrollPosition])


  return (
    <>
      <section className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 px-10 py-5 md:gap-4  mx-auto text-white  lg:max-w-5xl xl:max-w-6xl   text-Title-Small lg:text-Title-Small">
        <div className="col-span-1 ">
          <div>
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
            {isMounted && (
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
            )}
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
              ref={searchRef}
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
            {isMounted && (
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
            )}
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
