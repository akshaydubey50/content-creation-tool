import React from "react";
import PromptCard from "@/components/prompt/PromptCard";
import { PropmtResourceModel } from "@/models/airtable.model";

interface SimilarPromptsProps {
  category: any;
  similarPrompts: PropmtResourceModel[];
}

const SimilarPrompts = React.memo(
  ({ category, similarPrompts }: SimilarPromptsProps) => {
    return (
      <div className="px-4">
        <h1 className="text-xl md:text-3xl lg:text-4xl text-center my-6 md:my-8 w-full font-bold">
          Similar <span className="text-DarkOrange">{category} </span>
          Prompts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6">
          {similarPrompts.map((prompt) => (
            <PromptCard key={prompt.id} promptResource={prompt} />
          ))}
        </div>
      </div>
    );
  }
);

SimilarPrompts.displayName = "SimilarPrompts";

export default SimilarPrompts;
