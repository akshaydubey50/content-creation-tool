import React, { useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PropmtResourceModel } from "@/models/airtable.model";

interface PromptContentProps {
  promptData: PropmtResourceModel;
}

const PromptContent: React.FC<PromptContentProps> = React.memo(
  ({ promptData }) => {
    return (
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="mb-1 font-semibold">Prompts:</h3>
            <p className="whitespace-pre-line text-md text-muted-foreground">
              {promptData.fields.Description}
            </p>
          </div>
          <div>
            <div className="flex flex-row items-center gap-2">
              {promptData.fields.Source && (
                <>
                  <h3 className="font-semibold">Source: </h3>
                  <Link
                    href={promptData.fields.SourceLink || "#"}
                    className="hover:text-DarkOrange hover:underline"
                  >
                    {promptData.fields.Source}
                  </Link>
                </>
              )}
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center gap-2">
              <h3 className="font-semibold">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {promptData.fields.Category?.map((category, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-white hover:border-DarkOrange "
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center gap-2">
              {promptData.fields.Tags && (
                <>
                  <h3 className="font-semibold">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {promptData.fields?.Tags?.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-black "
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    );
  }
);

PromptContent.displayName = "PromptContent";

export default PromptContent;
