import ProductList from "@/components/card/ProductList";
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import Script from 'next/script'

export const dynamic = 'force-dynamic'

export default function Home() {
 
  return (
    <div className="mb-8">
      <HeroSection />
      {/* <div className="launchlist-widget" data-key-id="sFJR8e" data-height="180px"></div> */}
      <FilterSection />
      <ProductList />
      {/* <Script
        src="https://getlaunchlist.com/js/widget.js"
        defer
      /> */}
    </div>
  );
}
