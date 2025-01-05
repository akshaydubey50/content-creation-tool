import ProjectFilterSection from "@/components/projects/FilterSection";
import ProjectList from "@/components/projects/ProjectList";
import type { Metadata } from "next";
import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store';
import ProjectCardShimmer from "@/components/projects/ProjectCardShimmer";
import ProjectScreen from "@/components/projects";

export const metadata: Metadata = {
    title: "Content Creation Projects | Freelance Content Opportunities",
    description:
        "Explore freelance content projects for writers, ghostwriters, social media marketers, and content strategists. Find your next opportunity in content creation.",
};

export default function Projects() {
    const itemsPerPageCount = 12;

  
    return (
        <>
            <div className="min-w-xs bg-light-gray  h-[250px] lg:h-[300px] flex items-center justify-center px-4 mb-4">
                <div className="mx-auto max-w-8xl ">
                    <h1 className="text-2xl font-bold text-center md:text-4xl lg:text-6xl">
                        Content Creation <span className="text-DarkOrange">Projects</span>{" "}
                    </h1>
                </div>
            </div>

            <div className="px-4 py-8 mx-auto min-w-xs max-w-8xl container">
                <ProjectScreen itemsPerPageCount={itemsPerPageCount} />
            </div>


        </>
    );
}
