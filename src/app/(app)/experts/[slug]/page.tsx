"use client";
import ExpertsDetail from "@/components/experts/ExpertsDetail";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import Canonical from "@/components/seo/Canonical";
import { ExpertModel } from '../../../../models/airtable.model';

export default function Details() {
    const pathname = usePathname();
    const expertsList = useSelector((store: RootState) => store.experts.expertsList);

    // Extract the slug (expert identifier) from the pathname
    const expertSlug = pathname?.split("/")[2]?.toLowerCase();

    console.log("expertSlug::::::::::", decodeURIComponent(expertSlug))
    // Find the matching expert
    const expert = expertsList?.find((item:ExpertModel) => {
        const username = item?.fields?.Username?.toLowerCase()?.trim()?.replace(/\s+/g, "-");
        return username === decodeURIComponent(expertSlug);
    });

    console.log("Current Expert Details:", expert);

    return (
        <>
            <Canonical />
            {expert ? (
                <ExpertsDetail expert={expert} />
            ) : (
                <div className="text-center mt-10">
                    <h2 className="text-lg font-semibold">Expert not found</h2>
                    <p className="text-gray-500">We couldn’t find the expert you’re looking for.</p>
                </div>
            )}
        </>
    );
}
