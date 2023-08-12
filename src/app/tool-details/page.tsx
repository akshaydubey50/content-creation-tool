"use client";
import AffiliateToolBanner from "@/components/affiliate-tool/affiliate-tool-banner";
import ProudctCard from "@/components/card/ProductCard";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

export default function ToolDetails() {
  return (
    <>
      {/* <Navbar /> */}
      <AffiliateToolBanner img={""} title={""} description={""} tag={""} link={""} />
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center  my-5 w-full font-bold">
        Similar <span className="text-DarkOrange">Other</span> Tools
      </h1>
      <ProudctCard />
    </>
  );
}
