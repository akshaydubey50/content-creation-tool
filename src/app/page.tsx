import Navbar from '@/components/navbar/Navbar'
import HeroSection from '@/components/herosection/HeroSection'
import FilterSection from '@/components/filter/FilterSection'
import ProductCard from '@/components/card/ProductCard'
import CTAButton from "@/components/button/CTAButton";



export default function Home() {
  return (
    <div>
      <Navbar /> 
      <HeroSection />
      <FilterSection />
      <ProductCard />
      <ProductCard />
      <CTAButton />
    </div>
  )
}
