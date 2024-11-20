import ProductList from "@/components/card/ProductList";
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import NewsLetter from "@/components/newsletter";
import FAQ from "@/components/faq";

export default function Home() {
  const itemPerPageCount = 12;
  return (
    <div className="mb-8 pt-[40px] lg:pt-[60px]  overflow-x-hidden">
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
