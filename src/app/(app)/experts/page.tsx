
import ExpertsMainScreen from "@/components/experts/ExpertsMainScreen";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Content Creation Experts | Writers, Copywriters, Marketers & More",
    description:
        "Find top content creation experts—writers, ghostwriters, copywriters, social media marketers, and personal branding specialists—to enhance your content and strategy.",
};
import Canonical from "@/components/seo/Canonical";

export default function Experts() {
    const itemCountPerPage = 12;
    return (
    <>

  <Canonical/>
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
