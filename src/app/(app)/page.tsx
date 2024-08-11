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
      {/* <div className="launchlist-widget" data-key-id="sFJR8e" data-height="180px"></div> */}
      <FilterSection />
      <ProductList />
      <FAQ />

      <NewsLetter />
      <div className="m-4">
        <NewsLetterModal />
      </div>
      {/* <Script
        src="https://getlaunchlist.com/js/widget.js"
        defer
        /> */}
    </div>
  );
}
