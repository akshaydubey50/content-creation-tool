"use client";
import AirtableModel from "@/models/airtable.model";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import SelectDropdown from "./SelectDropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryData,
  clearCategoryData,
  clearMatchedCategory,
} from "@/redux/slice/category/categorySlice";
import {
  setSearchQuery,
  setSearchFilterList,
  clearSearchFilterList,
  scrollPage,
} from "@/redux/slice/search/searchSlice";
import { clearMatchedPrice,clearPriceData,setMatchedPrice,setPriceData} from "@/redux/slice/priceModel/priceModelSlice"
import { RootState, AppDispatch } from "@/redux/store";

export default function FilterSection() {
  const [isMounted, SetIsMounted] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  /*Redux Dispatch & Selector*/
  const dispatch = useDispatch();
  const categoryData = useSelector(
    (store: RootState) => store.category.categoryData
  );
  const searchQuery = useSelector(
    (store: RootState) => store.search.searchQuery
  );
  const filterData = useSelector(
    (store: RootState) => store.search.searchFilterList
  );
  const { productList } = useSelector((state: RootState) => state.product);
  const searchToFocusInput = useSelector(
    (state: RootState) => state.search.searchToFocus
  );
  const scrollPosition = useSelector(
    (state: RootState) => state.search.scrollPosition
  );
  const {priceData,matchedPrice}=useSelector((state:RootState)=>state.priceModel)

  /*Context Data*/
  const { setVisibleItem } = useVisibleItemContextData();

  /*Search Functionality*/
  const handleSearch = () => {
    const newSearch = searchRef.current!.value.toLowerCase();
    dispatch(setSearchQuery(newSearch));

    /* Filter data based on the updated search query */
    const filteredResults = productList && productList?.filter((searchData: AirtableModel) => {
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
      dispatch(setCategoryData(categoryVal));
      setVisibleItem(9);
      dispatch(scrollPage(600))
      router.push(`/category/${formatedCategory}`);

    }
  };

  /* Selected Category functionality */
  const selectedPriceModel = (selectedOption: any) => {
    if (selectedOption) {
      let priceVal = selectedOption.value;
      debugger  
      const getPriceList = productList.filter((item: AirtableModel) => {
        const pricingVal = item.fields?.Pricing
        if (Array.isArray(pricingVal)){
          return pricingVal[0]?.toLowerCase() === priceVal?.toLowerCase()
        }
        return false
      })
      dispatch(setMatchedPrice(getPriceList))
      console.log("getPriceList", getPriceList)
      setVisibleItem(9);
      dispatch(scrollPage(600))
      dispatch(clearSearchFilterList());
      dispatch(setPriceData(priceVal));
      // router.push(`/category/${formatedCategory}`);

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

    if (searchRef.current!.value) {
      searchRef.current!.value = '';
      searchRef.current!.innerText = '';
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
    (item: string, index: number) => {
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


  const priceOptionList = Array.from(priceModelList()).map(
    (item: string, index: number) => {
      return {
        value: item,
        label: item,
      };
    }
  );

  const priceTypeHandler = useCallback(() => {

    const getPriceList = productList.filter((item:AirtableModel) => item?.fields?.Pricing[0]?.toLowerCase() == priceData?.toLowerCase())
    dispatch(setMatchedPrice(getPriceList))
    console.log(getPriceList)
  }, [])

  useEffect(() => {
    SetIsMounted(true);
  }, []);

  useEffect(() => {
    if (searchToFocusInput) {
      searchRef.current?.focus()
    }
  }, [searchToFocusInput])

  useEffect(() => {
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  }, [categoryData, scrollPosition])




  return (
    <>
      <section className="hidden md:flex flex-wrap justify-center px-10 py-5 md:gap-4  mx-auto text-white  lg:max-w-5xl xl:max-w-6xl   text-Title-Small lg:text-Title-Small">
        <div className="">
          <div>
            <button
              className="bg-DarkOrange  px-5 lg:px-8 py-3 rounded-full   focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-semibold w-full text-center "
              onClick={clearFilter}
            >
              All
            </button>
          </div>
        </div>
        <div className="basis-1/5 z-0">
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
        <div className="basis-32 z-0">
          <div className=" bg-DarkOrange text-center  rounded-full    h-full">
            {isMounted && (
              <SelectDropdown
                key={priceData}
                placeholder="Pricing "
                options={priceOptionList}
                onChange={selectedPriceModel}
                value={priceOptionList.find(
                  (option) => option.value === priceData
                ) || null}
              />
            )}
          </div>
        </div>
        <div className=" font-medium">
          <div className="">
            <button
              className="bg-DarkOrange whitespace-nowrap px-5  py-3 rounded-full   focus:bg-orange-200 focus:outline focus:outline-DarkOrange focus:outline-2 font-semibold w-full text-center"
              onClick={clearFilter}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="basis-1/4 font-medium">
          <div className=" text-black py-0.5 ">
            <input
              ref={searchRef}
              onChange={handleSearch}
              className="rounded-xl  w-full  border-2 outline-none px-4 py-2 font-medium border-black border-solid"
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
            className="rounded-xl  w-full  border-2 outline-none p-3 font-medium border-black border-solid"
            type="text"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>
        <div className="col-span-1">
          <div className="bg-DarkOrange  rounded-full  text-white  w-full ">
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
