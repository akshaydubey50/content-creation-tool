"use client";
import Breadcrumb from "@/components/common/Breadcrumb";
import PromptCard from "@/components/prompt/PromptCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PromptData {
  Source: string;
  Name: string;
  Category: string[];
  Description: string;
  Tags: string[];
}

export default function PromptDetailPage({ params: { slug } }: any) {
  const promptData = {
    Source: "Semrush",
    Name: "Identify Trending Topics in a Niche",
    Category: ["Content Ideation"],
    Description:
      "Based on the provided niche keywords, identify and list 3 trending topics that could be of interest to the audience.\nNiche Keywords: {niche_keywords}\nTarget Audience: {target_audience}",
    Tags: ["Blog", "SEO"],
  };

  return (
    <div className="container  mx-auto px-4 py-8 max-w-7xl mt-20">
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Breadcrumb categories="prompt" currentPageTitle={slug} key={slug} />
      </nav>

      <Card className="mb-6 border border-black bg-light-gray">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-3xl font-bold">
              {promptData.Name}
            </CardTitle>
            <Button variant="outline" size="sm" className="border-black">
              Copy Prompt
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Prompt:</h3>
              <p className="text-md text-muted-foreground whitespace-pre-line">
                {promptData.Description}
              </p>
            </div>
            <div>
              <div className="flex flex-row items-center gap-2">
                <h3 className="font-semibold mb-1">Source: </h3>
                <p className="text-sm text-gray-600">{promptData.Source}</p>
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center gap-2">
                <h3 className="font-semibold mb-1">Categories:</h3>
                <div className="flex flex-wrap gap-2">
                  {promptData.Category.map((category, index) => (
                    <Badge key={index} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center gap-2">
                <h3 className="font-semibold mb-1">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {promptData.Tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/*  <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            👍 0
          </Button>
          <Button variant="ghost" size="sm">
            👎 0
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          &lt;/&gt; Embed
        </Button>
      </div> */}

      <div className="px-4">
        <h1 className="text-xl md:text-3xl lg:text-4xl text-center  my-6 md:my-8 w-full font-bold">
          Similar{" "}
          <span className="text-DarkOrange">{promptData?.Category[0]} </span>
          Prompts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6">
          <PromptCard />
          <PromptCard />
          <PromptCard />
          <PromptCard />
          <PromptCard />
          <PromptCard />
          <PromptCard />
        </div>
      </div>
    </div>
  );
}
