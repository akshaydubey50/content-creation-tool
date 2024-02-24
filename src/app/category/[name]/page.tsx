"use client";
import React, { useEffect } from "react";

/**
 * React Component Import
 * */ 
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import ProductList from "@/components/card/ProductList";


/**
 * Context Data Import
 * */ 
import { useVisibleItemContextData } from "@/lib/visibleItemContext";

/**
 * Redux Import
 * */ 

export default function ToolDetails() {

  const { setVisibleItem } = useVisibleItemContextData();

  useEffect(() => {
    setVisibleItem(9);
  }, [ setVisibleItem]);

  return (
    <>
      <HeroSection />
      <FilterSection />
      <ProductList />
    </>
  );
}
