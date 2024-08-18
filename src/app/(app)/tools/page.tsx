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
    <div className="mb-8">
      <HeroSection />
      <FilterSection />
      <ProductList />
      <FAQ />
      <NewsLetter />  
        <NewsLetterModal />
     
    </div>
  );
}
