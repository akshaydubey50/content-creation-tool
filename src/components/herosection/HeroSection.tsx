"use client"
import React from "react";

export default function HeroSection() {
  return (
    <main className="bg-DarkOrange  md:mb-[50px]">
      <div className="flex flex-col justify-center items-start md:justify-center md:items-center p-10  lg:p-40 px-5 lg:px-10 gap-y-5">
        <div className="container mx-auto  text-white text-center w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
          <h1 className="text-Heading-Small mb-3 md:text-Heading-Medium lg:text-Heading-Large font-bold leading-tight ">
            Discover 200+ Content Creation
            <br />
            Tools to Fuel Your Creativity
          </h1>
          {/* UI */}

          <h5 className="text-tags md:text-Medium lg:text-Title-Large tracking-wide">
            Search our massive database of the best and  highest-paying
            <span className="md:block"> affiliate programs.</span>
          </h5>
        </div>
        <div className="flex mx-auto flex-col w-full  max-w-[85%]  md:max-w-lg md:flex-row justify-center items-center md:gap-x-4 gap-y-3 md:gap-y-0 text-Description">
          <input
            type="text"
            placeholder="Enter the name of the product / program you want to search"
            className="w-[85%] rounded-full px-4  py-1 md:px-5 md:py-2 lg:px-6 focus:outline-none"
          />
          <button className="bg-black text-white rounded-full px-5 py-1 md:px-6 md:py-2">Submit</button>
        </div>
      </div>
    </main>
  );
}
