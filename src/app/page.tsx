import ProductList from "@/components/card/ProductList";
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div>
      <HeroSection />
       <FilterSection />
      <ProductList />
    </div>
  );
}
