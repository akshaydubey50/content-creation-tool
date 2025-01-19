import ProductList from "@/components/card/ProductList";
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import NewsLetter from "@/components/newsletter";
import FAQ from "@/components/faq";
import Canonical from "@/components/seo/Canonical";

export const metadata = {
  title: 'Tools - Content Creation',
  description: 'Explore our collection of content creation tools',
};

export default function ToolsPage() {
  return (
    <div className="mb-8 overflow-x-hidden">
      <Canonical />
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
