

"use client";
import ProductList from "@/components/card/ProductList";
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import NewsLetter from "@/components/newsletter";
import FAQ from "@/components/faq";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import PromptLibrary from "@/components/prompt/prompt-library";

export default function Home() {
  const router = useRouter();

  const allToolsClickHandler = () => {
    router.push("/tools");
  };
  const itemPerPageCount = 6;
  return (
    <div className="mb-8 overflow-x-hidden">
      <HeroSection />
      <FilterSection />
      <ProductList itemsCount={itemPerPageCount} />
      <div className="flex items-center justify-center">
        <button className="px-12 py-3 mt-4 text-lg font-semibold text-white border-2 rounded-full border-DarkOrange bg-DarkOrange hover:bg-orange-300 focus:bg-DarkOrange" onClick={allToolsClickHandler}>
          All Tools
        </button>
      </div>
      <div className="px-6 xl:px-0">
        <NewsLetter />
      </div>
    </div>

  );
}
