"use client";
import ProudctCard from "@/components/card/ProductCard";
import { useApiDataContext } from "@/lib/productContext";
import AirtableModel from "@/models/airtableModel";
import React, { useEffect, useState } from "react";
import HeroSection from "@/components/herosection/HeroSection";
import { usePathname } from "next/navigation";
import FilterSection from "@/components/filter/FilterSection";
import { useParams } from 'next/navigation'

export default function ToolDetails() {
  const { apiData } = useApiDataContext();
  const pathName = usePathname();
  const param = useParams();


  const [matchedCategory, setMatchedCategory] = useState<AirtableModel>();
  const [filterData, setFilterData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
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
      setMatchedCategory(filteredData)
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
    // console.log('ParamData::', paramData)

    // from paramData we can get the current category base on url param
    const getParamBaseCategory = paramData?.fields.Tags[0];
    setFilterData([]);
    setCategoryData(getParamBaseCategory);
    console.log('getParamBaseCategory::',getParamBaseCategory);
    console.log('categoryData::',categoryData);

  }, [apiData, pathName, param.name,categoryData]);

  return (
    <>
      <HeroSection />
      <FilterSection
        setFilterData={setFilterData}
        categoryData={categoryData}
        setCategoryData={setCategoryData}
      />
      <ProudctCard categoryData={matchedCategory} filterData={filterData} isFromUrl={true} />
    </>
  );
}
