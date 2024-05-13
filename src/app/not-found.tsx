"use client"
import * as RoutePath from "@/constants/RoutePath";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const route = useRouter()
  return (
    <div className="flex flex-col items-center mt-12 px-4">
      <p className="font-bold uppercase text-3xl">Could not find requested resource</p>
      <button className="bg-[#FF8C00] text-base px-4 py-2 text-white rounded-lg hover:text-black hover:bg-white hover:outline hover:outline-2 mt-4"
        onClick={() => route.push(RoutePath.HomePage)}>
        Return Home
      </button>
    </div>
  );
}
