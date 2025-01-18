import PromptLibrary from "@/components/prompt/prompt-library";
import Canonical from "@/components/seo/Canonical";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Creation Prompts Library",
  description:
    "Explore our collection of content creation prompts to boost your creativity and productivity.",
};

export default function Prompt() {
  return (
    <>

  <Canonical/>
      <div className="min-w-xs bg-light-gray pt-[80px] h-[250px] lg:h-[300px] flex items-center justify-center px-4">
        <div className="mx-auto max-w-8xl ">
          <h1 className="text-2xl font-bold text-center md:text-4xl lg:text-6xl">
            Content Creation <span className="text-DarkOrange">Prompts</span>{" "}
          </h1>
        </div>
      </div>
      <div className="px-4 mx-auto min-w-xs max-w-8xl">
        <PromptLibrary />
      </div>
    </>
  );
}
