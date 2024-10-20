"use client";
import * as RoutePath from "@/constants/RoutePath";
import { fetchExpertsList } from "@/redux/slice/experts/experts.slice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Experts() {
    const dispatch =useDispatch();

    useEffect(()=>{
        dispatch(fetchExpertsList())
    },[dispatch])
    const route = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-[79vh] space-y-4 ">
            <h2 className="inline-block pb-4 text-5xl font-bold text-center text-transparent md:text-6xl bg-gradient-to-b from-DarkOrange to-white bg-clip-text">Coming Soon</h2>

            <button
                className="px-6 py-2 text-base border-2 rounded-full border-DarkOrange text-DarkOrange hover:bg-orange-100 "
                onClick={() => route.push(RoutePath.HomePage)}
            >
                Back to Home
            </button>
        </div>

    );
}
