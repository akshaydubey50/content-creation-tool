"use client";
import Breadcrumb from "@/components/common/Breadcrumb";
import PromptCard from "@/components/prompt/PromptCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

interface PromptData {
  Source: string;
  Name: string;
  Category: string[];
  Description: string;
  Tags: string[];
  SourceLink: string;
}

export default function PromptDetailPage({ params: { slug } }: any) {
  const promptData = {
    Source: "Semrush",
    Name: "Identify Trending Topics in a Niche",
    Category: ["Content Ideation"],
    Description:
      "Based on the provided niche keywords, identify and list 3 trending topics that could be of interest to the audience.\nNiche Keywords: {niche_keywords}\nTarget Audience: {target_audience}",
    Tags: ["Blog", "SEO"],
    SourceLink:
      "https://www.semrush.com/blog/identifying-trending-topics-in-a-niche/",
  };

  const [isTextCopied, setIsTextCopied] = useState<boolean>(false);
  const [isBookMarked, setIsBookMarked] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = async () => {
    setIsLiked(!isLiked);
  };
  const handleBoomark = async () => {
    setIsBookMarked(!isBookMarked);
  };

  const copyPrompt = async () => {
    setIsTextCopied(false);
    navigator.clipboard.writeText(promptData.Description);
    setIsTextCopied(true);
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
            <div className="flex items-center gap-4 ">
              <button title="Bookmark" type="button" onClick={handleLike}>
                {isLiked ? (
                  <AiFillHeart className="text-2xl text-DarkOrange" />
                ) : (
                  <AiOutlineHeart className="text-2xl   text-black" />
                )}
              </button>
              <button title="Bookmark" type="button" onClick={handleBoomark}>
                {isBookMarked ? (
                  <BsBookmarkFill className="text-2xl text-DarkOrange" />
                ) : (
                  <BsBookmark className="text-2xl   text-black" />
                )}
              </button>
              <Button
                onClick={copyPrompt}
                variant="outline"
                size="sm"
                className={`border-black ${isTextCopied ? "bg-DarkOrange text-white border-none" : ""}`}
              >
                {isTextCopied ? "Copied " : "Copy"} Prompt
              </Button>
            </div>
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
                <h3 className="font-semibold">Source: </h3>
                <Link
                  href={promptData.SourceLink}
                  className=" hover:text-DarkOrange hover:underline  "
                >
                  {promptData.Source}
                </Link>
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center gap-2">
                <h3 className="font-semibold">Categories:</h3>
                <div className="flex flex-wrap gap-2">
                  {promptData.Category.map((category, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      // className="border-black"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center gap-2">
                <h3 className="font-semibold">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {promptData.Tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-black"
                    >
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
