import ProductList from "@/components/card/ProductList";
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import NewsLetter from "@/components/newsletter";
import FAQ from "@/components/faq";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directory of 200+ Content Creation Tools - Content Creation FYI",
  description:"Explore 200+ content creation tools for AI writing, social media, design, video editing, and more. Find free, free trial, paid, and premium options to boost your workflow."
};

export default function Home() {
  const itemPerPageCount = 12;
  return (
    <div className="mb-8 overflow-x-hidden">
      <HeroSection />
      <FilterSection />
      <ProductList itemsCount={itemPerPageCount} />
      <FAQ />
      <div className="px-6 xl:px-0">
        <NewsLetter />
      </div>
    </div>

  );
}
