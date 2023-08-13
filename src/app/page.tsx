"use client"

import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import ProductCard from "@/components/card/ProductCard";
import Navbar from "@/components/navbar/Navbar";
import { useState } from "react";

export default function Home() {
  const [filterData, setFilterData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [priceData, setPriceData] = useState([]);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <FilterSection
        setFilterData={setFilterData}
        setCategoryData={setCategoryData}
        setPriceData={setPriceData}
        />
      <ProductCard
        filterData={filterData}
        categoryData={categoryData}
        priceData={priceData}
      />
    </div>
  );
}
