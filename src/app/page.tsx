"use client";
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import ProductCard from "@/components/card/ProductCard";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FilterSection />
      <ProductCard />
    </div>
  );
}
