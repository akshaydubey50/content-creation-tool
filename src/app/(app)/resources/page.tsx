"use client";
import * as RoutePath from "@/constants/RoutePath";
import { useRouter } from "next/navigation";

export default function Resources() {
    const route = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-[79vh] space-y-4">
            <h2 className="font-bold text-5xl md:text-6xlx text-center pb-4 inline-block text-transparent bg-gradient-to-b from-DarkOrange to-white bg-clip-text">Coming Soon</h2>
          
            <button
                className="border-2 border-DarkOrange text-base px-6 py-2 text-DarkOrange rounded-full hover:bg-orange-100 "
                onClick={() => route.push(RoutePath.HomePage)}
            >
                Back to Home
            </button>
        </div>

    );
}
