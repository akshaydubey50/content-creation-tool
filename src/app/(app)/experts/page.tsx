"use client";

import ExpertsMainScreen from "@/components/experts/ExpertsMainScreen";

export default function Experts() {
    const itemCountPerPage = 12;
    return (
    <>
    <div className="min-w-xs bg-light-gray  h-[250px] lg:h-[300px] flex items-center justify-center px-4 mb-4">
        <div className="mx-auto max-w-8xl ">
            <h1 className="text-2xl font-bold text-center md:text-4xl lg:text-6xl">
                Content Creation <span className="text-DarkOrange">Experts</span>{" "}
            </h1>
        </div>
    </div>
    <div className="px-4 mx-auto min-w-xs max-w-8xl">
    </div>
            <ExpertsMainScreen itemsCount={itemCountPerPage} />
    </>
    );
}
