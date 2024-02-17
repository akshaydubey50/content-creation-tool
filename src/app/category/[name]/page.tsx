"use client";
import ProudctCard from "@/components/card/ProductCard";
import { useApiDataContext } from "@/lib/productContext";
import AirtableModel from "@/models/airtableModel";
import React, { useEffect, useState } from "react";
import HeroSection from "@/components/herosection/HeroSection";
import { usePathname } from "next/navigation";
import FilterSection from "@/components/filter/FilterSection";
import { useParams,useRouter } from 'next/navigation'
import {useVisibleItemContextData } from "@/lib/visibleItemContext";
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryData, setMatchedCategory } from "@/lib/categorySlice";
import {  clearSearchFilterData } from "@/lib/searchSlice"


export default function ToolDetails() {

  const dispatch = useDispatch();
  const categoryData = useSelector((store)=>store.category.categoryData)

  const { apiData } = useApiDataContext();
  const { setVisibleItem } = useVisibleItemContextData();
  const pathName = usePathname();
  const param = useParams();


const categoryTypeHandler = ()=>{
  const urlData = pathName.split('/').filter((item) => item !== '');
  // console.log('urlData::', urlData)
  if (urlData.length > 0) {
    const getCurrentCategory = urlData[urlData.length - 1];
    console.log('urlData::', getCurrentCategory)
    // Filter data directly based on the current category in the URL
    const filteredData = apiData.filter((item: AirtableModel) =>
      item.fields.Tags[0]?.toLowerCase().replace(/\s/g, "-") === getCurrentCategory
    );
    console.log('filteredData::', filteredData);
    dispatch(setMatchedCategory(filteredData))
  }

  // url params value set to category dropdown
  const paramData = apiData.find((item: AirtableModel) => {
    let urlParamCategoryName = param.name;
    if (param.name && param.name.includes('%26')) {
      urlParamCategoryName = param.name.replace(/%26/g, '&');
    }
    let contexApiData = item.fields.Tags[0]?.toLowerCase().replace(/\s/g, "-")
    return contexApiData === urlParamCategoryName
  }
  );

  // from paramData we can get the current category base on url param
  const getParamBaseCategory = paramData?.fields.Tags[0];
  dispatch(clearSearchFilterData())
  dispatch(setCategoryData(getParamBaseCategory))
}

  useEffect(() => {
    setVisibleItem(9); 
    categoryTypeHandler();

  }, [apiData, pathName, param.name]);

  return (
    <>
      <HeroSection />
      <FilterSection />
      <ProudctCard  isFromUrl={true} />
    </>
  );
}
