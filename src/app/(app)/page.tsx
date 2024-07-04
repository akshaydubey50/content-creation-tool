import ProductList from "@/components/card/ProductList";
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";

export const dynamic = 'force-dynamic'

export default async function Home() {

  const response = await fetch("http://localhost:3000/api/tools")
  const responseBody = await response.json();

  return (
    <div className="mb-8">
      <HeroSection productList={responseBody.data} />
      <FilterSection productList={responseBody.data} />
      <ProductList productList={responseBody.data} />
    </div>
  );
}
