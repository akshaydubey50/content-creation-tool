import ProductList from "@/components/card/ProductList";
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import Script from "next/script";
import NewsLetter from "@/components/newsletter";
import FAQ from "@/components/faq";
import NewsLetterModal from "@/components/modal/NewsLetterModal";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="mb-8 pt-[40px] lg:pt-[60px]  overflow-x-hidden">
      <HeroSection />
      <FilterSection />
      <ProductList />
      <FAQ />
      <div className="px-8 xl:px-0">
      <NewsLetter />  
      </div>
        <NewsLetterModal />
     
    </div>
  );
}
