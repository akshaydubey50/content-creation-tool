"use client";
import { AirtableModel } from "@/models/airtable.model";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import SelectDropdown from "./SelectDropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryData,
  clearCategoryData,
  clearMatchedCategory,
} from "@/redux/slice/category/category.slice";
import {
  setSearchQuery,
  setSearchFilterList,
  clearSearchFilterList,
  scrollPage,
} from "@/redux/slice/search/search.slice";
import {
  clearMatchedPrice,
  clearPriceData,
  setMatchedPrice,
  setPriceData,
} from "@/redux/slice/priceModel/priceModel.slice";
import { RootState, AppDispatch } from "@/redux/store";
import { HomePage } from "@/constants/RoutePath";

export default function FilterSection() {
  const [isMounted, SetIsMounted] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  /*Redux Dispatch & Selector*/
  const dispatch = useDispatch();
  const categoryData = useSelector(
    (store: RootState) => store.categories.categoryData
  );
  const searchQuery = useSelector(
    (store: RootState) => store.search.searchQuery
  );
  const { productList } = useSelector((state: RootState) => state.products);
  const searchToFocusInput = useSelector(
    (state: RootState) => state.search.searchToFocus
  );
  const scrollPosition = useSelector(
    (state: RootState) => state.search.scrollPosition
  );
  const { priceData } = useSelector((state: RootState) => state.pricingModel);

  /*Context Data*/
  const { setVisibleItem } = useVisibleItemContextData();

  /*Search Functionality*/
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("searchRef", searchRef.current?.value);
    router.push("/");
    dispatch(scrollPage(600));
    dispatch(clearMatchedPrice());
    dispatch(clearPriceData());
    dispatch(clearCategoryData());
    dispatch(clearMatchedCategory());
    const newSearch = event.target.value.toLowerCase();
    dispatch(setSearchQuery(newSearch));

    /* Filter data based on the updated search query */
    const filteredResults =
      productList &&
      productList?.filter((searchData: AirtableModel) => {
        const tooldatalist = searchData.fields.Name?.toLowerCase();
        if (newSearch) {
          return tooldatalist?.includes(newSearch);
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
      dispatch(clearSearchFilterList());
      dispatch(clearMatchedPrice());
      dispatch(clearPriceData());

      dispatch(setCategoryData(categoryVal));
      setVisibleItem(9);
      dispatch(scrollPage(600));
      router.push(`${HomePage}/category/${formatedCategory}`);
    }
  };

  /* Selected Category functionality */
  const selectedPriceModel = (selectedOption: any) => {
    if (selectedOption) {
      let priceVal = selectedOption.value;
      const getPriceList = productList.filter((item: AirtableModel) => {
        const pricingVal = item.fields?.Pricing;
        if (Array.isArray(pricingVal)) {
          return pricingVal[0]?.toLowerCase() === priceVal?.toLowerCase();
        }
        return false;
      });
      dispatch(setMatchedPrice(getPriceList));
      console.log("getPriceList", getPriceList);
      setVisibleItem(9);
      dispatch(scrollPage(600));
      dispatch(clearSearchFilterList());
      dispatch(setPriceData(priceVal));

      dispatch(clearCategoryData());
      dispatch(clearMatchedCategory());
    }
  };

  /*Clear Filter*/
  const clearFilter = () => {
    dispatch(setSearchQuery(""));
    dispatch(clearSearchFilterList());
    dispatch(clearMatchedCategory());
    dispatch(clearCategoryData());

    dispatch(clearMatchedPrice());
    dispatch(clearPriceData());

    if (searchRef.current?.value) {
      searchRef.current!.value = "";
      searchRef.current!.innerText = "";
    }

    setVisibleItem(9);
    router.push("/");
  };

  /*Get a List for Category*/
  const getListOfCategory = (): Set<string> => {
    const categoryItem = new Set<string>([]);
    productList?.length > 0 &&
      productList?.map((item: AirtableModel) => {
        if (item?.fields?.Tags !== undefined) {
          categoryItem.add(item?.fields?.Tags[0]);
        }
      });
    return categoryItem;
  };

  const categoryOptionsList = Array.from(getListOfCategory()).map(
    (item: string) => {
      return {
        value: item,
        label: item,
      };
    }
  );

  const priceModelList = (): Set<string> => {
    const priceItem = new Set<string>([]);
    productList?.length > 0 &&
      productList?.map((item: AirtableModel) => {
        if (item?.fields?.Pricing !== undefined) {
          priceItem.add(item?.fields?.Pricing[0]);
        }
      });
    return priceItem;
  };

  const priceOptionList = Array.from(priceModelList()).map((item: string) => {
    return {
      value: item,
      label: item,
    };
  });

  useEffect(() => {
    SetIsMounted(true);
  }, []);

  useEffect(() => {
    if (searchToFocusInput) {
      searchRef.current?.focus();
    }
  }, [searchToFocusInput]);

  useEffect(() => {
    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
  }, [categoryData, scrollPosition, searchQuery]);

  return (
    <>
      <section className="hidden md:grid md:grid-cols-12 place-content-center px-10 py-5 md:gap-4  mx-auto text-white  lg:max-w-5xl xl:max-w-6xl   text-Title-Small lg:text-Title-Small">
        <div className=" md:col-span-2 ">
          <div>
            <button
              className="bg-DarkOrange  px-5 lg:px-8 py-3 rounded-full   focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-semibold w-full text-center "
              onClick={clearFilter}
            >
              All
            </button>
          </div>
        </div>
        <div className="md:col-span-6 lg:col-span-3 z-0">
          <div className=" bg-DarkOrange  rounded-full    h-full">
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
        <div className="md:col-span-4 lg:col-span-2 z-0">
          <div className=" bg-DarkOrange text-center  rounded-full    h-full">
            {isMounted && (
              <SelectDropdown
                key={priceData}
                placeholder="Pricing "
                options={priceOptionList}
                onChange={selectedPriceModel}
                value={
                  priceOptionList.find(
                    (option) => option.value === priceData
                  ) || null
                }
              />
            )}
          </div>
        </div>
        <div className=" md:col-span-4 lg:col-span-2 font-medium">
          <div className="">
            <button
              className="bg-DarkOrange whitespace-nowrap px-5  py-3 rounded-full   focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-semibold w-full text-center"
              onClick={clearFilter}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className=" md:col-span-8 lg:col-span-3 font-medium">
          <div className=" text-black py-0.5 ">
            <input
              ref={searchRef}
              onChange={handleSearch}
              className="rounded-xl  w-full  border-2 outline-none px-4 py-2 font-medium border-black border-solid"
              type="text"
              placeholder="Search By Product Name"
            />
          </div>
        </div>
      </section>

      {/* Visible in mobile screen only */}
      <section className="grid grid-cols-1 md:hidden py-[25px]  gap-3 text-Title-Small lg:text-Title-Large max-w-md mx-auto px-[30px]">
        <div className="col-span-1">
          <input
            className="rounded-xl  w-full  border-2 outline-none p-3 font-medium border-black border-solid"
            type="text"
            placeholder="Search By Product Name"
            onChange={handleSearch}
            ref={searchRef}
          />
        </div>
        <div className="col-span-1">
          <div className="bg-DarkOrange  rounded-full   text-white  w-full ">
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
        <div className="col-span-1">
          <div className=" bg-DarkOrange text-center   rounded-full    h-full">
            {isMounted && (
              <SelectDropdown
                key={priceData}
                placeholder="Pricing "
                options={priceOptionList}
                onChange={selectedPriceModel}
                value={
                  priceOptionList.find(
                    (option) => option.value === priceData
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
                className="w-full bg-DarkOrange   p-3 rounded-full   focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 "
                onClick={clearFilter}
              >
                All
              </button>
            </div>
            <div className="col-span-1">
              <button
                className="w-full bg-DarkOrange whitespace-nowrap p-3 rounded-full    focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 "
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
