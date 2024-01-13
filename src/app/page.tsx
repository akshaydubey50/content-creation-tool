"use client";
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import ProductList from "@/components/card/ProductList";
import { useState } from "react";

export default function Home() {
  const [filterData, setFilterData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  return (
    <div>
      <HeroSection />
      <FilterSection
        setFilterData={setFilterData}
        setCategoryData={setCategoryData}
      />
      <ProductList filterData={filterData} categoryData={categoryData} />
    </div>
  );
}
