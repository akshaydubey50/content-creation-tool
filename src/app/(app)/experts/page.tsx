
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
    <div className=" bg-light-gray  ">
                <section
                    className="flex flex-col px-4 space-y-10 place-items-center xl:space-y-14 md:px-8 xl:px-10 py-12 lg:py:14 xl:py-16">
                    <div>
                        <div className="flex flex-col space-y-4 text-center">
                            <p>
                                <span
                                    className="px-4 py-1 font-semibold bg-white border border-orange-500 border-solid rounded-full text-DarkOrange">
                                    50+ Content Creation Experts
                                </span>
                            </p>
                            <h1
                                className="mx-auto text-2xl font-semibold leading-9 md:text-4xl md:leading-45 md:max-w-2xl xl:text-7xl xl:max-w-4xl xl:leading-tight">
                                <span> Hire content experts </span>
                                <span>for your next project.</span>
                            </h1>
                            <div
                                className="max-w-lg px-2 mx-auto text-base text-center md:text-base xl:text-2xl xl:max-w-4xl xl:leading-normal">
                                Explore global content experts from various fields, locations, and languages, ready to bring your ideas to life.
                            </div>
                        </div>
                    </div>

                </section>
    </div>
   
            <ExpertsMainScreen itemsCount={itemCountPerPage} />
    </>
    );
}
