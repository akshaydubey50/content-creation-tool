import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import ProductCard from "@/components/card/ProductCard";
import Navbar from "@/components/navbar/Navbar";

  export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <FilterSection />
      <ProductCard />
    </div>
  );
}
