"use client";
import ProudctCard from "@/components/card/ProductCard";
import { useApiDataContext } from "@/lib/productContext";
import AirtableModel from "@/models/airtableModel";
import React, { useEffect,useState } from "react";
import HeroSection from "@/components/herosection/HeroSection";
import { usePathname } from "next/navigation";
import FilterSection from "@/components/filter/FilterSection";

export default function ToolDetails() {
  const { apiData } = useApiDataContext();
  const pathName = usePathname();
  const [matchedCategory, setMatchedCategory] = useState<AirtableModel>();
  const [filterData, setFilterData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    const urlData = pathName.split('/').filter((item) => item !== '');

    if (urlData.length > 0) {
      const getCurrentCategory = urlData[urlData.length - 1];
      console.log(getCurrentCategory);

      // Filter data directly based on the current category in the URL
      const filteredData = apiData.filter((item:AirtableModel) =>
        item.fields.Tags[0]?.toLowerCase().replace(/\s/g, "-") === getCurrentCategory
      );

      console.log(filteredData);
      setMatchedCategory(filteredData)
    }

  }, [apiData, pathName]);

  return (
    <>
      <HeroSection />
      <FilterSection
       setFilterData={setFilterData}
       setCategoryData={setCategoryData}
      />
      <ProudctCard categoryData={matchedCategory} filterData={filterData} isFromUrl={true}/>
    </>
  );
}
