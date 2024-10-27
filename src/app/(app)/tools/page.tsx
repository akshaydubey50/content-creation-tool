import ProductList from "@/components/card/ProductList";
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import NewsLetter from "@/components/newsletter";
import FAQ from "@/components/faq";

export default function Home() {
  return (
    <div className="mb-8 overflow-x-hidden">
      <HeroSection />
      <FilterSection />
      <ProductList />
      <FAQ />
      <div className="px-6 xl:px-0">
        <NewsLetter />
      </div>
    </div>

  );
}
