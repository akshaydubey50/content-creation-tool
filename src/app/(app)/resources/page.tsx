"use client";
import Resource from "@/components/resources";
import Canonical from "@/components/seo/Canonical";
import * as RoutePath from "@/constants/RoutePath";
import { useRouter } from "next/navigation";

export default function Resources() {
  const route = useRouter();

  if(true){
    return (
      <div className="flex flex-col items-center justify-center h-[79vh] space-y-4 ">

  <Canonical/>
        <h2 className="inline-block pb-4 text-5xl font-bold text-center text-transparent md:text-6xl bg-gradient-to-b from-DarkOrange to-white bg-clip-text">Coming Soon</h2>

        <button
          className="px-6 py-2 text-base border-2 rounded-full border-DarkOrange text-DarkOrange hover:bg-orange-100 "
          onClick={() => route.replace(RoutePath.HomePage)}
        >
          Back to Home
        </button>
      </div>
    )
  }
  return (
    <>
      <div className="min-w-xs bg-light-gray pt-[80px] h-[250px] lg:h-[300px] flex items-center justify-center px-4">
        <div className="mx-auto max-w-8xl ">
          <h1 className="text-2xl font-bold text-center md:text-4xl lg:text-6xl">
            Content Creation <span className="text-DarkOrange">Resource</span>{" "}
          </h1>
        </div>
      </div>
      <div className="px-4 mx-auto min-w-xs max-w-8xl">
        <Resource />
      </div>
    </>
  );
}
