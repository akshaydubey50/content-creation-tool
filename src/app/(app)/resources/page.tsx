"use client";
import HeroSection from "@/components/herosection/HeroSection";
import Resource from "@/components/resource";
import { useRouter } from "next/navigation";

export default function Resources() {
    return (
      <>
           <HeroSection />
            <Resource />
      </>
    );
}
