"use client";
import React, { useEffect, useState } from "react";
import { useApiDataContext } from "@/lib/productContext";
import CardContainer from "@/components/card/ProductCard";
import AirtableModel from "@/models/airtableModel";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import { useRouter, useParams } from 'next/navigation'
import Select from 'react-select';

type Product = {
  // url: string;
  title: string;
  description: string;
  tag: string;
  link: string;
};
export default function FilterSection({ setFilterData, setCategoryData, categoryData }: any) {
  console.log('categoryData', categoryData)
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryValue, setCategoryValue] = useState(categoryData || "");
  const { apiData } = useApiDataContext();
  const { visibleItem, setVisibleItem } = useVisibleItemContextData();
  const router = useRouter();



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

  const selectedCategory = (selectedOption: any) => {
    if (selectedOption) {
      let categoryVal = selectedOption.value;
      let formatedCategory = categoryVal.toLowerCase().replace(/\s/g, "-");
      router.push(`/category/${formatedCategory}`);
      setFilterData("");
      setCategoryData(categoryVal);
      setCategoryValue(categoryVal);
    }
  };
  const clearFilter = () => {
    router.push('/');
    setCategoryValue("");
    setCategoryData("");
    setSearchQuery("");
    setVisibleItem(9);
    setFilterData([]);
  };
  useEffect(() => {
    if (categoryData !== categoryValue) {
      setCategoryValue(categoryData);
    }
  }, [
    setCategoryValue,
    setCategoryData,
    setSearchQuery,
    setVisibleItem,
    setFilterData,
    categoryData, categoryValue
  ])

  const categoryOptionsList = Array.from(getListOfCategory()).map((item: string, index: number) => {
    return {
      value: item,
      label: item
    };
  });



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
          <div className=" bg-DarkOrange  rounded-full px-5 h-full">
            {/* <select
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
            </select> */}
            <Select
              className=" font-semibold"
              id="categoryData"
              styles={{
                // Apply custom styles for the select container (optional)
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "var(--DarkOrange)",
                  color: 'white',
                  outline: 'none',
                  border: 'none',
                  '&:hover': {
                    outline: 'none',
                    border: 'none',
                  },
                  '&:focus': {
                    outline: 'none',
                    border: 'none',
                  },
                }),
                // Apply custom styles for the options dropdown (optional)
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "var(--DarkOrange)",
                  color: 'white',
                }),
                menuList: (provided) => ({
                  ...provided,
                  backgroundColor: "#FF8C00",
                  textAlign: 'center',
                  scrollbarWidth: 'none',
                  '-ms-overflow-style': 'none',
                  '&::-webkit-scrollbar': {
                    width: 0,
                  },
                  '&:hover': {
                    border: 'none',
                    outline: 'none'
                  },
                  '&:focus': {
                    border: 'none',
                    outline: 'none'
                  },
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#fed7aa' : '#FF8C00',
                  '&:hover': {
                    backgroundColor: '#fed7aa',
                  },
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                  padding: "12px 20px",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: "white",
                  paddingRight: "24px"
                }),
              }}
              options={categoryOptionsList}
              value={categoryValue}
              onChange={selectedCategory}
              isSearchable={false}
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
      <section className="grid grid-cols-1 md:hidden py-[25px]  gap-3 text-Title-Small lg:text-Title-Large max-w-md mx-auto px-[30px]">
        <div className="col-span-1">
          <input
            className="rounded-full w-full  border-2 outline-none p-3 font-medium border-black border-solid"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="col-span-1">
          <div className="bg-DarkOrange  rounded-full p-2 font-semibold text-white  w-full ">
            {/* <select
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
            </select> */}
            <Select
              id="categoryData"
              className="font-semibold"
              styles={{
                // Apply custom styles for the select container (optional)
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "var(--DarkOrange)",
                  color: 'white',
                  outline: 'none',
                  border: 'none',
                  '&:hover': {
                    outline: 'none',
                    border: 'none',
                  },
                  '&:focus': {
                    outline: 'none',
                    border: 'none',
                  },
                }),
                // Apply custom styles for the options dropdown (optional)
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "var(--DarkOrange)",
                  color: 'white',
                }),
                menuList: (provided) => ({
                  ...provided,
                  backgroundColor: "#FF8C00",
                  textAlign: 'center',
                  scrollbarWidth: 'none',
                  '-ms-overflow-style': 'none',
                  '&::-webkit-scrollbar': {
                    width: 0,
                  },
                  '&:hover': {
                    border: 'none',
                    outline: 'none'
                  },
                  '&:focus': {
                    border: 'none',
                    outline: 'none'
                  },
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#fed7aa' : '#FF8C00',
                  '&:hover': {
                    backgroundColor: '#fed7aa',
                  },
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                  padding: "12px 20px",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: "white",
                  paddingRight: "24px"
                }),
              }}
              options={categoryOptionsList}
              value={categoryValue}
              onChange={selectedCategory}
              isSearchable={false}
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











        {/* <div className="text-black lg:w-full ">
           <input
            className="rounded-full w-full  border-2 outline-none px-3 py-2 font-medium border-black border-solid"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          /> 
        </div>*/}
        {/* <div className="flex justify-center space-x-4">
          <div className="bg-DarkOrange  rounded-full px-3 font-medium  py-2  w-full lg:w-1/3">
            
            <Select
              id="categoryData"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "var(--DarkOrange)",
                  color: 'white',
                  outline: 'none',
                  border: 'none',
                  '&:hover': {
                    outline: 'none',
                    border: 'none',
                  },
                  '&:focus': {
                    outline: 'none',
                    border: 'none',
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "var(--DarkOrange)",
                  color: 'white',
                }),
                menuList: (provided) => ({
                  ...provided,
                  backgroundColor: "#FF8C00",
                  textAlign: 'center',
                  scrollbarWidth: 'none',
                  '-ms-overflow-style': 'none',
                  '&::-webkit-scrollbar': {
                    width: 0,
                  },
                  '&:hover': {
                    border: 'none',
                    outline: 'none'
                  },
                  '&:focus': {
                    border: 'none',
                    outline: 'none'
                  },
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#fed7aa' : '#FF8C00',
                  '&:hover': {
                    backgroundColor: '#fed7aa',
                  },
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                  padding: "12px 20px",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: "white",
                  paddingRight: "24px"
                }),
              }}
              options={categoryOptionsList}
              value={categoryValue}
              onChange={selectedCategory}
              isSearchable={false}
            />
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
        </div> */}
      </section>
    </>
  );
}
