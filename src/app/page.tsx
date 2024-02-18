"use client";
import ProductList from "@/components/card/ProductList";
import HeroSection from "@/components/herosection/HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      {/*  <FilterSection
         setFilterData={setFilterData}
        setCategoryData={setCategoryData}  
      /> */}
      <ProductList />
    </div>
  );
}
